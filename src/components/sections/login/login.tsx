"use client";

import style from "./login.module.scss";
import React, { ChangeEvent, useState } from "react";
import Link from "next/link";
import {
  emailIsValid,
  passwordIsMinimumValid,
} from "@/helpers/validation/validation";
import ElementFormInput from "@/components/elements/form-input/form-input";
import { Button } from "@mui/material";
import Api from "@/services/api/api";
import { setUserLoginTokens } from "@/services/auth/auth";
import { useRouter } from "next/navigation";

export type DataSectionLogin = {};

export default function SectionLogin(data: DataSectionLogin) {
  const {} = data;

  const router = useRouter();

  type FormsField = {
    value: string;
    valid: boolean;
    invalid: boolean;
  };

  type DataForms = {
    email: FormsField;
    password: FormsField;
  };

  const [forms, setForms] = useState<DataForms>({
    email: {
      value: "",
      valid: false,
      invalid: false,
    },
    password: {
      value: "",
      valid: false,
      invalid: false,
    },
  });

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;

    forms.email = {
      value: email,
      valid: !!email && emailIsValid(email),
      invalid: false,
    };
    setForms({ ...forms });
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;

    forms.password = {
      value: password,
      valid: false,
      invalid: false,
    };
    setForms({ ...forms });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = forms;

    email.invalid = !emailIsValid(email.value);
    password.invalid = !passwordIsMinimumValid(password.value);

    if (email.invalid || password.invalid) {
      setForms({ email, password });
      return;
    }

    Api.public
      .getUserLogin({ email: email.value, password: password.value })
      .then((response) => {
        console.log(response);
        const { access_token, refresh_token, token_type } = response;
        setUserLoginTokens(access_token, token_type, refresh_token);
        router.replace("/painel");
      })
      .catch((error) => {
        email.invalid = true;
        email.valid = false;

        password.invalid = true;
        password.valid = false;
        setForms({ email, password });
        console.log(error);
      });
  };

  return (
    <section id={style.SectionLoggin}>
      <h2 className={style.title}>Login In</h2>
      <p className={style.text}>Welcome back, please login to your account.</p>
      <form className={style.form} onSubmit={onSubmit}>
        <ElementFormInput
          type="email"
          placeholder="Seu Email"
          onChange={onChangeEmail}
          value={forms.email.value}
          valid={forms.email.valid}
          invalid={forms.email.invalid}
        />
        <ElementFormInput
          type="password"
          placeholder="Sua Senha"
          onChange={onChangePassword}
          value={forms.password.value}
          valid={forms.password.valid}
          invalid={forms.password.invalid}
        />
        <div className={style.containerButtons}>
          <div className={style.containerButton}>
            <Button
              className={`${style.button} ${style.buttonLoggin}`}
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </div>
          <Link href="/auth/sign-up" className={style.containerButton}>
            <Button
              className={`${style.button} ${style.buttonSiginUp}`}
              color="primary"
              type="submit"
              variant="outlined"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </form>
    </section>
  );
}
