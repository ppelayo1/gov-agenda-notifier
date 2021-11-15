import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Subscribe.scss";
import classnames from "classnames";
import { useLocation, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import BackNavigation from "../BackNavigation/BackNavigation";
import Spinner from "../Spinner/Spinner";
import CustomInput from "../CustomInput/CustomInput";
import SubscribeConfirmation from "./SubscribeConfirmation";
import { validatePhone, getPhoneDigits, validateEmail } from "./validation";
import { convertQueryStringToServerFormat } from "./subscribeQueryString";

import { CREATE_SUBSCRIPTIONS } from "../../graphql/graphql";
import { getUserEmail } from "../../utils/verifyToken";

/**
 * 10.2021 Update: Per product team direction, this component has
 * been retired. Users will instead subscribe with the initial
 * subscribe button, that now triggers subscriptions to be sent
 * directly to the registered contact info associated to their account.
 *
 * This is the component for community member subscribe page.
 *
 * state:
 *    isFormSubmitted
 *      A boolean value that indicates whether the form has been submitted
 *    phone
 *      A string value that stores the entered user's phone
 *    email
 *      A string value that stores the entered user's email
 *    phoneError
 *      A validation error for phone
 *    emailError
 *      A validation error for email
 *    subscriptions
 *      Newly created subscriptions (response from the server)
 *    createSubscriptions
 *      The function that creates a subscription (or subscriptions) on the server
 *    loading
 *      A boolean values that indicates whether the communication with the server is in progress
 *    error
 *      An error object returned from the server if there is any error
 */

function Subscribe() {
  const { t } = useTranslation();

  const history = useHistory();
  const queryString = useLocation().search;
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(getUserEmail());
  const [phoneError, setPhoneError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [subscriptions, setSubscriptions] = useState(null);

  const [createSubscriptions, { loading, error }] = useMutation(
    CREATE_SUBSCRIPTIONS,
    {
      onCompleted: (data) =>
        setSubscriptions(data?.createSubscriptions ?? null),
    }
  );

  const handlePhoneChanged = (e) => {
    // Uses only digits of the input value to construct a phone number string
    // in the form of '+1 (234) 567-8910'.
    const digits = getPhoneDigits(e.target.value);
    const oldDigits = getPhoneDigits(phone);

    let newPhone = digits.length > 0 ? "+1" : "";
    if (digits.length > 1 && digits.length <= 4) {
      newPhone += ` (${digits.substring(1)}`;
      if (digits.length === 4 && oldDigits.length < digits.length) {
        newPhone += ") ";
      }
    } else if (digits.length > 4 && digits.length <= 7) {
      newPhone += ` (${digits.substring(1, 4)}) ${digits.substring(4)}`;
      if (digits.length === 7 && oldDigits.length < digits.length) {
        newPhone += "-";
      }
    } else if (digits.length > 7) {
      newPhone += ` (${digits.substring(1, 4)}) ${digits.substring(
        4,
        7
      )}-${digits.substring(7, 11)}`;
    }

    setPhone(newPhone);
  };

  const handleEmailChanged = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    setFormSubmitted(true);
    setPhoneError(null);
    setEmailError(null);
    const phoneValidationError = phone ? validatePhone(phone) : null;
    const emailValidationError = email ? validateEmail(email) : null;
    if (phoneValidationError !== null || emailValidationError !== null) {
      if (phoneValidationError) {
        setPhoneError(phoneValidationError);
      }
      if (emailValidationError) {
        setEmailError(emailValidationError);
      }
      // Form is not valid, do not continue.
      return;
    }
    e.preventDefault();

    createSubscriptions({
      variables: {
        phone_number: getPhoneDigits(phone),
        email_address: email,
        meetings: convertQueryStringToServerFormat(queryString),
      },
    });
  };

  const closeConfirmation = () => {
    history.goBack();
  };

  return (
    <div className={classnames("subscribe-view")}>
      <BackNavigation />
      <div className="wrapper">
        <div className="text">
          <h3>{t("meeting.tabs.agenda.list.subscribe.page.title")}</h3>
          <p>{t("meeting.tabs.agenda.list.subscribe.page.description")}</p>
          <form className="form">
            <div className="input-group">
              <span>
                {t("meeting.tabs.agenda.list.subscribe.page.inputs.sms.label")}
              </span>
              <CustomInput
                type="tel"
                placeholder={t(
                  "meeting.tabs.agenda.list.subscribe.page.inputs.sms.placeholder"
                )}
                isRequired
                isSubmitted={isFormSubmitted}
                value={phone}
                onChange={handlePhoneChanged}
                errorMessage={phoneError}
                inputNote={t(
                  "meeting.tabs.agenda.list.subscribe.page.inputs.sms.us-support-note"
                )}
              />
            </div>
            <div className="input-group">
              <span>
                {t(
                  "meeting.tabs.agenda.list.subscribe.page.inputs.email.label"
                )}
              </span>
              <CustomInput
                type="email"
                placeholder={t(
                  "meeting.tabs.agenda.list.subscribe.page.inputs.email.placeholder"
                )}
                isRequired
                isSubmitted={isFormSubmitted}
                value={email}
                onChange={handleEmailChanged}
                errorMessage={emailError}
              />
            </div>
            {subscriptions && subscriptions.length > 0 && (
              <SubscribeConfirmation
                numberOfSubscriptions={subscriptions.length}
                onClose={closeConfirmation}
              />
            )}
            {error && <div className="form-error">{error.message}</div>}
            <div className="row">
              <button
                type="button"
                disabled={!phone && !email}
                onClick={handleSubmit}
              >
                {loading && <Spinner />}
                {`Subscrib${loading ? "ing..." : "e"}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
