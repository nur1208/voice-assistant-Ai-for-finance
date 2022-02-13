import styled from "styled-components";

const INFO_BASE = "#2c40d0";
const PRIMARY_DARKEN4 = " #323a56;";
const TEXT_BASE = "#111111";

export const MainWrapper = styled.div`
  & {
    font-family: "SourceSansPro", sans-serif;
    background-color: ${PRIMARY_DARKEN4};
  }

  margin-bottom: 5rem;

  .container {
    width: 100%;
    padding: 12px;
    margin-right: auto;
    margin-left: auto;
  }

  .v-alert--text:before {
    background-color: currentColor;
    border-radius: inherit;
    bottom: 0;
    content: "";
    left: 0;
    opacity: 0.12;
    position: absolute;
    pointer-events: none;
    right: 0;
    top: 0;
  }

  & :after,
  & :before {
    text-decoration: inherit;
    vertical-align: inherit;
    background-repeat: no-repeat;
    box-sizing: inherit;
  }

  .v-sheet.v-alert:not(.v-sheet--outlined) {
    box-shadow: 0 0 0 0 rgb(0 0 0 / 20%), 0 0 0 0 rgb(0 0 0 / 14%),
      0 0 0 0 rgb(0 0 0 / 12%);
  }
  .info--text {
    color: ${INFO_BASE} !important;
    caret-color: ${INFO_BASE} !important;
  }
  .v-alert:not(.v-sheet--tile) {
    border-radius: 4px;
  }
  .v-sheet.v-alert {
    border-radius: 4px;
  }
  .v-alert--text.sim-warning-alert {
    background: #fff !important;
  }
  .v-sheet:not(.v-sheet--outlined) {
    box-shadow: 0 0 0 0 rgb(0 0 0 / 20%), 0 0 0 0 rgb(0 0 0 / 14%),
      0 0 0 0 rgb(0 0 0 / 12%);
  }
  .theme--dark.v-sheet {
    background-color: #1e1e1e;
    border-color: #1e1e1e;
    color: #fff;
  }
  .v-alert--text {
    background: transparent !important;
  }
  .v-alert--dense {
    padding-top: 8px;
    padding-bottom: 8px;
  }
  .v-alert {
    display: block;
    font-size: 16px;
    margin-bottom: 16px;
    padding: 16px;
    position: relative;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  }
  .v-sheet {
    border-radius: 0;
  }

  .v-alert__wrapper {
    align-items: center;
    border-radius: inherit;
    display: flex;
  }

  .v-alert__icon.v-icon {
    font-size: 24px;
  }

  .v-application--is-ltr .v-alert__icon {
    margin-right: 16px;
  }
  .v-icon.v-icon {
    align-items: center;
    display: inline-flex;
    font-feature-settings: "liga";
    font-size: 24px;
    justify-content: center;
    letter-spacing: normal;
    line-height: 1;
    position: relative;
    text-indent: 0;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), visibility 0s;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .theme--dark.v-icon {
    color: #fff;
  }
  .v-alert__icon {
    align-self: flex-start;
    border-radius: 50%;
    height: 24px;
    min-width: 24px;
    position: relative;
  }

  .v-icon__svg {
    fill: currentColor;
  }

  .v-icon__component,
  .v-icon__svg {
    height: 24px;
    width: 24px;
  }

  .v-icon.v-icon:after {
    background-color: currentColor;
    border-radius: 50%;
    content: "";
    display: inline-block;
    height: 100%;
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    transform: scale(1.3);
    width: 100%;
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1);
  }

  .v-alert__content {
    flex: 1 1 auto;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
    margin: -12px;
  }

  .sim-warning-alert .sim-warning-alert__message {
    color: ${TEXT_BASE};
    line-height: 26px;
    margin-left: 20px;
  }
  .flex-shrink-1 {
    flex-shrink: 1 !important;
  }
  .flex-grow-1 {
    flex-grow: 1 !important;
  }

  .col-12 {
    flex: 0 0 100%;
    max-width: 100%;
    width: 100%;
    padding: 12px;
  }

  .text-right {
    text-align: right !important;
  }
  .pt-0 {
    padding-top: 0 !important;
  }
  .flex-shrink-0 {
    flex-shrink: 0 !important;
  }
  .flex-grow-0 {
    flex-grow: 0 !important;
  }

  .v-btn:not(.v-btn--round).v-size--default {
    height: 36px;
    min-width: 64px;
    padding: 0 16px;
  }

  .primary--text {
    color: var(--v-primary-base) !important;
    caret-color: var(--v-primary-base) !important;
  }

  .sim-warning-alert .sim-warning-alert__button {
    font-size: 1rem !important;
  }
  .v-btn.v-size--default {
    font-size: 1rem;
  }
  .theme--dark.v-btn {
    color: #fff;
  }
  .text-h6 {
    font-size: 1.25rem !important;
    font-weight: 500;
    letter-spacing: 0.0125em !important;
  }
  .text-h5,
  .text-h6 {
    line-height: 2rem;
    font-family: "Cabin-semi-bold", sans-serif !important;
  }
  /* .text-right {
    text-align: right !important;
  } */
  [type="reset"],
  [type="submit"],
  button,
  html [type="button"] {
    -webkit-appearance: button;
  }
  .v-btn {
    align-items: center;
    border-radius: 4px;
    display: inline-flex;
    flex: 0 0 auto;
    font-weight: 500;
    letter-spacing: 0.0892857143em;
    justify-content: center;
    outline: 0;
    position: relative;
    text-decoration: none;
    text-indent: 0.0892857143em;
    text-transform: uppercase;
    transition-duration: 0.28s;
    transition-property: box-shadow, transform, opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
  }
  [role="button"],
  [type="button"],
  [type="reset"],
  [type="submit"],
  button {
    cursor: pointer;
    color: inherit;
  }
  button,
  input,
  select,
  textarea {
    background-color: transparent;
    border-style: none;
  }
  button,
  select {
    text-transform: none;
  }
  button {
    overflow: visible;
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    font: inherit;
  }

  // after Alert Components
  .mb-2 {
    margin-bottom: 8px !important;
  }

  @media (min-width: 960px) .flex-column {
    flex-direction: column !important;
  }
  .d-flex {
    display: flex !important;
  }

  @media (min-width: 600px) {
    .flex-sm-nowrap {
      flex-wrap: nowrap !important;
    }

    .col-sm-auto {
      flex: 0 0 auto;
      width: auto;
      max-width: 100%;
    }

    .pt-sm-3 {
      padding-top: 6px !important;
    }
  }
  @media (min-width: 960px) {
    .container {
      max-width: 900px;
    }
    .d-md-flex {
      display: flex !important;
    }
  }
  @media only screen and (min-width: 960px) {
    margin-bottom: 3.75rem;
  }
  @media (min-width: 1264px) {
    .container {
      max-width: 1185px;
    }
  }
`;
