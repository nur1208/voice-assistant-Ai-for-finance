import styled from "styled-components";

const INFO_BASE = "#2c40d0";
const PRIMARY_DARKEN4 = " #323a56;";
const TEXT_BASE = "#111111";
const PRIMARY_BASE = "#2c40d0";
const SUCCESS_BASE = "#009688";
const ERROR_BASE = "#ff5252";
const PRIMARY_LIGHTEN5 = "#dde9fb";

export const MainWrapper = styled.div`
  & {
    font-family: "SourceSansPro", sans-serif;
    background-color: ${PRIMARY_DARKEN4};
  }

  margin-bottom: 5rem;

  .container {
    /* width: 100%; */
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
    box-shadow: 0 0 0 0 rgb(0 0 0 / 20%),
      0 0 0 0 rgb(0 0 0 / 14%), 0 0 0 0 rgb(0 0 0 / 12%);
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
    box-shadow: 0 0 0 0 rgb(0 0 0 / 20%),
      0 0 0 0 rgb(0 0 0 / 14%), 0 0 0 0 rgb(0 0 0 / 12%);
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
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1),
      visibility 0s;
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

  .row + .row {
    margin-top: 12px;
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
    color: ${PRIMARY_BASE} !important;
    caret-color: ${PRIMARY_BASE} !important;
  }

  .v-icon.v-icon.v-icon--link {
    cursor: pointer;
    outline: none;
  }

  .v-icon.small {
    width: 1.5rem;
    height: 1.5rem;
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

  .text-overline {
    font-size: 0.625rem !important;
    font-weight: 600;
    line-height: 1.25rem;
    letter-spacing: 0.1666666667em !important;
    font-family: "Cabin-semi-bold", sans-serif !important;
    text-transform: uppercase !important;
  }
  .white--text {
    color: #fff !important;
    caret-color: #fff !important;
  }

  .v-sheet.v-card:not(.v-sheet--outlined) {
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%),
      0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
  }

  .v-sheet.v-card {
    border-radius: 4px;
  }
  .theme--light.v-card {
    background-color: #fff;
    color: rgba(0, 0, 0, 0.87);
  }

  .theme--light.v-sheet {
    background-color: #fff;
    border-color: #fff;
    color: rgba(0, 0, 0, 0.87);
  }

  .mb-2 {
    margin-bottom: 8px !important;
  }

  .v-card {
    border-width: thin;
    display: block;
    max-width: 100%;
    outline: none;
    text-decoration: none;
    transition-property: box-shadow, opacity;
    word-wrap: break-word;
    position: relative;
    white-space: normal;
  }

  .v-sheet {
    border-radius: 0;
  }

  .portfolio-summary {
    width: 23rem;
  }

  .v-card > :last-child:not(.v-btn):not(.v-chip):not(.v-avatar) {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
  }

  .v-card
    > .v-card__progress
    + :not(.v-btn):not(.v-chip):not(.v-avatar),
  .v-card
    > :first-child:not(.v-btn):not(.v-chip):not(.v-avatar) {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }
  .theme--light.v-card > .v-card__subtitle,
  .theme--light.v-card > .v-card__text {
    color: rgba(0, 0, 0, 0.6);
  }
  .text--text {
    color: ${TEXT_BASE} !important;
    caret-color: ${TEXT_BASE} !important;
  }
  .v-card__text {
    width: 100%;
  }
  .v-card__subtitle,
  .v-card__text,
  .v-card__title {
    padding: 16px;
  }
  .v-card__subtitle,
  .v-card__text {
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.375rem;
    letter-spacing: 0.0071428571em;
  }

  .pb-0 {
    padding-bottom: 0 !important;
  }
  .col {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
    width: 100%;
    padding: 12px;
    /* padding: 14px 12px; */
  }

  .col-12 {
    flex: 0 0 100%;
    max-width: 100%;
    width: 100%;
    padding: 12px;
  }

  .text-overline {
    font-size: 0.625rem !important;
    font-weight: 600;
    line-height: 1.25rem;
    letter-spacing: 0.1666666667em !important;
    font-family: "Cabin-semi-bold", sans-serif !important;
    text-transform: uppercase !important;
  }

  .text-h4 {
    font-size: 2.125rem !important;
    line-height: 2.5rem;
    letter-spacing: 0.0073529412em !important;
  }

  .text-h3,
  .text-h4 {
    font-weight: 400;
    font-family: "Cabin-semi-bold", sans-serif !important;
  }

  .text-h5 {
    font-size: 1.5rem !important;
    font-weight: 400;
    letter-spacing: normal !important;
  }

  .success--text {
    color: ${SUCCESS_BASE} !important;
    caret-color: ${SUCCESS_BASE} !important;
  }

  .text-subtitle-1 {
    font-size: 1rem !important;
    font-weight: 400;
    line-height: 1.75rem;
    letter-spacing: 0.009375em !important;
    font-family: "SourceSansPro", sans-serif !important;
  }
  .ml-2 {
    margin-left: 8px !important;
  }
  .v-icon.pLeft {
    padding-left: 5px;
  }

  .error--text {
    color: ${ERROR_BASE} !important;
    caret-color: ${ERROR_BASE} !important;
  }

  .pb-5 {
    padding-bottom: 20px !important;
  }

  .elevation-0 {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2),
      0 0 0 0 rgba(0, 0, 0, 0.14), 0 0 0 0 rgba(0, 0, 0, 0.12) !important;
  }

  .text-body-1,
  .text-body-2 {
    font-weight: 400;
    font-family: "SourceSansPro", sans-serif !important;
  }
  .text-body-1 {
    font-size: 1rem !important;
    line-height: 1.5rem;
    letter-spacing: 0.03125em !important;
  }

  .overline {
    font-size: 0.625rem !important;
    font-weight: 600;
    letter-spacing: 0.1666666667em !important;
    line-height: 1.25rem;
    text-transform: uppercase;
    font-family: "Cabin-semi-bold", sans-serif !important;
  }

  .theme--light.v-btn-toggle:not(.v-btn-toggle--group) {
    background: #fff;
    color: rgba(0, 0, 0, 0.87);
  }
  .v-btn-toggle--tile {
    border-radius: 0;
  }
  .v-btn-toggle {
    border-radius: 4px;
    display: inline-flex;
    max-width: 100%;
  }
  .v-item-group {
    flex: 0 1 auto;
    position: relative;
    max-width: 100%;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  }

  .performance-chart
    .v-btn-toggle
    > .v-btn.v-btn--active.v-item--active.v-btn--text {
    border-bottom: 2px solid ${PRIMARY_BASE} !important;
    color: ${PRIMARY_BASE};
  }

  .v-btn-toggle:not(.v-btn-toggle--dense)
    .v-btn.v-btn.v-size--default {
    height: 48px;
  }

  .v-application--is-ltr
    .v-btn-toggle
    > .v-btn.v-btn:first-child {
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
  }

  .theme--light.v-btn-toggle:not(.v-btn-toggle--group)
    .v-btn.v-btn {
    border-color: rgba(0, 0, 0, 0.12) !important;
  }

  .v-btn-toggle .v-btn.v-btn.v-size--default {
    min-width: 48px;
    min-height: 0;
  }

  .v-btn-toggle--borderless > .v-btn.v-btn {
    border-width: 0;
  }

  .v-btn-toggle > .v-btn.v-btn--active {
    color: inherit;
    opacity: 1;
  }
  .v-btn-toggle > .v-btn.v-btn {
    border-radius: 0;
    border-style: solid;
    border-width: thin;
    box-shadow: none;
    opacity: 0.8;
    padding: 0 12px;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    height: 36px;
    min-width: 64px;
    padding: 0 16px;
  }
  .v-btn.v-size--default {
    font-size: 1rem;
  }
  .theme--light.v-btn {
    color: rgba(0, 0, 0, 0.87);
  }
  .v-application .text-button {
    font-size: 0.875rem !important;
    font-weight: 500;
    line-height: 2.25rem;
    letter-spacing: 0.0892857143em !important;
    font-family: "SourceSansPro", sans-serif !important;
    text-transform: uppercase !important;
  }

  .theme--light.v-btn--active:before,
  .theme--light.v-btn--active:hover:before {
    opacity: 0.18;
  }

  .v-btn:before {
    background-color: currentColor;
    border-radius: inherit;
    bottom: 0;
    color: inherit;
    content: "";
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1);
  }

  .v-btn-toggle > .v-btn.v-btn:first-child {
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
  }

  .white-border {
    border-color: #fff !important;
  }

  .performance-chart .line-chart {
    height: 17.5rem;
  }

  .theme--light.v-progress-linear {
    color: rgba(0, 0, 0, 0.87);
  }
  .v-progress-linear {
    height: 0px;
    background: transparent;
    overflow: hidden;
    position: relative;
    transition: 0.2s cubic-bezier(0.4, 0, 0.6, 1);
    width: 100%;
  }

  .primary {
    background-color: ${PRIMARY_BASE} !important;
    border-color: ${PRIMARY_BASE} !important;
  }

  .v-progress-linear__background {
    opacity: 0.3;
    left: 0%;
    width: 100%;

    bottom: 0;
    left: 0;
    position: absolute;
    top: 0;
    transition: inherit;
  }

  .v-progress-linear__buffer {
    height: 0px;
    height: inherit;
    left: 0;
    position: absolute;
    top: 0;
    transition: inherit;
    width: 100%;
  }

  .v-progress-linear .v-progress-linear__indeterminate .long,
  .v-progress-linear .v-progress-linear__indeterminate .short {
    -webkit-animation-play-state: paused;
    animation-play-state: paused;
    background-color: inherit;
    bottom: 0;
    height: inherit;
    left: 0;
    position: absolute;
    right: auto;
    top: 0;
    width: auto;
    will-change: left, right;
  }

  .apexcharts-canvas {
    position: relative;
    user-select: none;
    width: 753px;
    height: 268px;
  }

  .mt-1 {
    margin-top: 4px !important;
  }

  .align-center {
    align-items: center !important;
  }

  .v-application .justify-space-between {
    justify-content: space-between !important;
  }

  .mb-4 {
    margin-bottom: 16px !important;
  }

  .d-flex {
    display: flex !important;
  }

  .justify-end {
    justify-content: flex-end !important;
  }

  .dollar-switch {
    padding-top: 0.375rem;
  }

  .px-2 {
    padding-right: 8px !important;
    padding-left: 8px !important;
  }

  .theme--light.v-input,
  .theme--light.v-input input,
  .theme--light.v-input textarea {
    color: rgba(0, 0, 0, 0.87);
  }

  .v-input--selection-controls.v-input {
    flex: 0 1 auto;
  }

  .mr-6 {
    margin-right: 24px !important;
  }

  .mt-0 {
    margin-top: 0 !important;
  }

  .v-input {
    align-items: flex-start;
    display: flex;
    flex: 1 1 auto;
    font-size: 16px;
    letter-spacing: normal;
    max-width: 100%;
    text-align: left;
  }

  .v-input--selection-controls {
    margin-top: 16px;
    padding-top: 4px;
  }

  .portfolio-holdings {
    margin-bottom: 2rem;
  }

  .white {
    background-color: #fff !important;
    border-color: #fff !important;
  }

  .pa-0 {
    padding: 0 !important;
  }
  .order-1 {
    order: 1 !important;
  }

  .pl-1 {
    padding-left: 4px !important;
  }

  .order-2 {
    order: 2 !important;
  }

  .v-sheet.v-toolbar:not(.v-sheet--outlined) {
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%),
      0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
  }

  .theme--light.v-toolbar.v-sheet {
    background-color: #fff;
  }
  .v-sheet.v-toolbar {
    border-radius: 0;
  }
  .v-sheet:not(.v-sheet--outlined) {
    box-shadow: 0 0 0 0 rgb(0 0 0 / 20%),
      0 0 0 0 rgb(0 0 0 / 14%), 0 0 0 0 rgb(0 0 0 / 12%);
  }
  .theme--light.v-sheet {
    background-color: #fff;
    border-color: #fff;
    color: rgba(0, 0, 0, 0.87);
  }
  .v-toolbar--flat {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2),
      0 0 0 0 rgba(0, 0, 0, 0.14), 0 0 0 0 rgba(0, 0, 0, 0.12) !important;
  }
  .v-toolbar {
    contain: layout;
    display: block;
    flex: 1 1 auto;
    max-width: 100%;
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
      background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
      left 0.2s cubic-bezier(0.4, 0, 0.2, 1),
      right 0.2s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1),
      max-width 0.25s cubic-bezier(0.4, 0, 0.2, 1),
      width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%),
      0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
  }
  .v-sheet {
    border-radius: 0;
  }

  .v-toolbar--dense .v-toolbar__content,
  .v-toolbar--dense .v-toolbar__extension {
    padding-top: 0;
    padding-bottom: 0;
  }
  .v-toolbar__content,
  .v-toolbar__extension {
    align-items: center;
    display: flex;
    position: relative;
    z-index: 0;
  }
  .v-toolbar__content,
  .v-toolbar__extension {
    padding: 4px 16px;
  }

  .v-toolbar__content > .v-tabs:last-child,
  .v-toolbar__extension > .v-tabs:last-child {
    margin-right: -16px;
  }

  .v-toolbar__content > .v-tabs:first-child,
  .v-toolbar__extension > .v-tabs:first-child {
    margin-left: -16px;
  }
  .v-toolbar__content > .v-tabs,
  .v-toolbar__extension > .v-tabs {
    height: inherit;
    margin-top: -4px;
    margin-bottom: -4px;
  }
  .v-tabs {
    flex: 1 1 auto;
    width: 100%;
  }

  .v-toolbar__content > .v-tabs > .v-slide-group.v-tabs-bar,
  .v-toolbar__extension > .v-tabs > .v-slide-group.v-tabs-bar {
    background-color: inherit;
    height: inherit;
  }

  .theme--light.v-tabs > .v-tabs-bar {
    background-color: #fff;
  }
  .v-application .primary--text {
    color: var(--v-primary-base) !important;
    caret-color: var(--v-primary-base) !important;
  }
  .v-item-group {
    flex: 0 1 auto;
    position: relative;
    max-width: 100%;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  }
  .v-slide-group {
    display: flex;
  }
  .v-tabs-bar {
    border-radius: inherit;
    height: 48px;
  }

  .v-slide-group.v-item-group > .v-slide-group__next,
  .v-slide-group.v-item-group > .v-slide-group__prev {
    cursor: pointer;
  }

  .v-slide-group:not(.v-slide-group--has-affixes)
    > .v-slide-group__next,
  .v-slide-group:not(.v-slide-group--has-affixes)
    > .v-slide-group__prev {
    display: none;
  }
  .v-tabs-bar.v-item-group > * {
    cursor: auto;
  }
  .v-slide-group__next--disabled,
  .v-slide-group__prev--disabled {
    display: none;
  }
  .v-slide-group__next--disabled,
  .v-slide-group__prev--disabled {
    pointer-events: none;
  }
  .v-slide-group__next,
  .v-slide-group__prev {
    align-items: center;
    display: flex;
    flex: 0 1 52px;
    justify-content: center;
    min-width: 52px;
  }

  .v-tabs-bar.v-item-group > * {
    cursor: auto;
  }

  .v-slide-group__wrapper {
    contain: content;
    display: flex;
    flex: 1 1 auto;
    overflow: hidden;
  }

  .v-slide-group__content {
    display: flex;
    flex: 1 0 auto;
    position: relative;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    white-space: nowrap;
  }

  .v-tabs-slider-wrapper {
    bottom: 0;
    margin: 0 !important;
    position: absolute;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    z-index: 1;
  }

  .v-tabs-slider {
    height: 100%;
    width: 100%;
  }
  .v-tab:before,
  .v-tabs-slider {
    background-color: currentColor;
  }

  .v-tabs--grow > .v-tabs-bar .v-tab {
    flex: 1 0 auto;
    max-width: none;
  }

  .v-tabs:not(.v-tabs--vertical) .v-tab {
    white-space: normal;
  }

  .holding-tab {
    font-size: 0.75rem;
  }
  .v-tab.v-tab {
    color: inherit;
  }
  .v-tab--active {
    color: inherit;
  }
  .v-tab {
    align-items: center;
    cursor: pointer;
    display: flex;
    flex: 0 1 auto;
    font-size: 0.875rem;
    font-weight: 500;
    justify-content: center;
    letter-spacing: 0.0892857143em;
    line-height: normal;
    min-width: 90px;
    max-width: 360px;
    outline: none;
    padding: 0 16px;
    position: relative;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    transition: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .theme--light.v-tabs .v-tab--active:before,
  .theme--light.v-tabs .v-tab--active:hover:before,
  .theme--light.v-tabs .v-tab:focus:before {
    opacity: 0.12;
  }

  .v-tab--active.v-tab:not(:focus):before {
    opacity: 0;
  }

  .v-tab:before,
  .v-tabs-slider {
    background-color: currentColor;
  }
  .v-tab:before {
    bottom: 0;
    content: "";
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  }

  .theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) {
    color: rgba(0, 0, 0, 0.54);
  }

  .order-3 {
    order: 3 !important;
  }

  .theme--light.v-divider {
    border-color: rgba(0, 0, 0, 0.12);
  }

  .v-divider {
    display: block;
    flex: 1 1 0px;
    max-width: 100%;
    height: 0;
    max-height: 0;
    border: solid;
    border-width: thin 0 0;
    transition: inherit;
  }

  hr {
    overflow: visible;
    height: 0;
  }

  .mr-8 {
    margin-right: 32px !important;
  }

  .semi-bold {
    font-family: "Cabin-semi-bold", sans-serif;
  }

  .text-no-wrap {
    white-space: nowrap !important;
  }

  .d-inline-flex {
    display: inline-flex !important;
  }

  .horizontal-scroll-shadow {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    background-image: linear-gradient(90deg, #fff, #fff),
      linear-gradient(90deg, #fff, #fff),
      linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.25),
        hsla(0, 0%, 100%, 0)
      ),
      linear-gradient(
        270deg,
        rgba(0, 0, 0, 0.25),
        hsla(0, 0%, 100%, 0)
      );
    background-position: 0, 100%, 0, 100%;
    background-repeat: no-repeat;
    background-color: #fff;
    background-size: 20px 100%, 20px 100%, 20px 100%, 20px 100%;
    background-attachment: local, local, scroll, scroll;
  }

  .horizontal-scroll-shadow .theme--light.v-data-table {
    background-color: transparent;
  }

  .theme--light.v-data-table {
    background-color: #fff;
    color: rgba(0, 0, 0, 0.87);
  }

  .v-data-table {
    line-height: 1.5;
    max-width: 100%;
  }

  .v-data-table {
    border-radius: 4px;
  }

  .horizontal-scroll-shadow .v-data-table__wrapper {
    overflow-x: unset;
    overflow-y: unset;
  }

  .v-data-table__wrapper {
    overflow-x: auto;
    overflow-y: hidden;
  }

  .v-data-table > .v-data-table__wrapper > table {
    width: 100%;
    border-spacing: 0;
  }

  .theme--light.v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr:not(:last-child)
    > td:last-child,
  .theme--light.v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr:not(:last-child)
    > td:not(.v-data-table__mobile-row),
  .theme--light.v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr:not(:last-child)
    > th:last-child,
  .theme--light.v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr:not(:last-child)
    > th:not(.v-data-table__mobile-row),
  .theme--light.v-data-table
    > .v-data-table__wrapper
    > table
    > thead
    > tr:last-child
    > th {
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
  }
  .v-application--is-ltr
    .v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr
    > th,
  .v-application--is-ltr
    .v-data-table
    > .v-data-table__wrapper
    > table
    > tfoot
    > tr
    > th,
  .v-application--is-ltr
    .v-data-table
    > .v-data-table__wrapper
    > table
    > thead
    > tr
    > th {
    text-align: left;
  }
  .theme--light.v-data-table
    > .v-data-table__wrapper
    > table
    > thead
    > tr
    > th {
    color: rgba(0, 0, 0, 0.6);
  }
  .v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr
    > th,
  .v-data-table
    > .v-data-table__wrapper
    > table
    > tfoot
    > tr
    > th,
  .v-data-table
    > .v-data-table__wrapper
    > table
    > thead
    > tr
    > th {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-size: 0.75rem;
    height: 48px;
  }
  .v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr
    > td,
  .v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr
    > th,
  .v-data-table
    > .v-data-table__wrapper
    > table
    > tfoot
    > tr
    > td,
  .v-data-table
    > .v-data-table__wrapper
    > table
    > tfoot
    > tr
    > th,
  .v-data-table
    > .v-data-table__wrapper
    > table
    > thead
    > tr
    > td,
  .v-data-table
    > .v-data-table__wrapper
    > table
    > thead
    > tr
    > th {
    padding: 0 16px;
    transition: height 0.2s cubic-bezier(0.4, 0, 0.6, 1);
  }

  .v-data-table-header th.sortable {
    pointer-events: auto;
    cursor: pointer;
    outline: 0;
  }

  .text-left {
    text-align: left !important;
  }

  .v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr
    > td,
  .v-data-table
    > .v-data-table__wrapper
    > table
    > tfoot
    > tr
    > td,
  .v-data-table
    > .v-data-table__wrapper
    > table
    > thead
    > tr
    > td {
    font-size: 0.875rem;
    height: 48px;
  }

  .theme--light.v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr:not(:last-child)
    > td:not(.v-data-table__mobile-row) {
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
  }

  .symbol-row-toggle {
    font-size: 1.125rem;
  }

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

  .holding-tab {
    font-size: 0.875rem;
  }

  .symbol {
    max-width: 3.5rem;
  }

  .holdings-table .symbol-description {
    line-height: 1.2;
  }

  .py-1 {
    padding-top: 4px !important;
    padding-bottom: 4px !important;
  }

  .theme--light.v-application .text--disabled {
    color: rgba(0, 0, 0, 0.38) !important;
  }

  .text-center {
    text-align: center !important;
  }

  .mt-6 {
    margin-top: 24px !important;
  }

  .v-btn:not(.v-btn--outlined).primary {
    color: #fff;
  }

  .v-btn:not(.v-btn--round).v-size--default {
    height: 36px;
    min-width: 64px;
    padding: 0 16px;
  }

  .blue_bgc {
    background-color: ${PRIMARY_LIGHTEN5} !important;
  }

  @media (min-width: 960px) {
    /* .symbol-row-toggle[data-v-547e8c4e] {
      cursor: pointer;
    } */
    .container {
      max-width: 900px;
    }
    .d-md-flex {
      display: flex !important;
    }

    .flex-column {
      flex-direction: column !important;
    }

    .mr-md-7 {
      margin-right: 28px !important;
    }

    .order-md-1 {
      order: 1 !important;
    }

    .mb-md-0 {
      margin-bottom: 0 !important;
    }

    .mr-md-4 {
      margin-right: 16px !important;
    }

    .portfolio-holdings {
      margin-bottom: 3rem;
    }

    .text-md-right {
      text-align: right !important;
    }

    .order-md-2 {
      order: 2 !important;
    }

    .col-md-6 {
      flex: 0 0 50%;
      max-width: 50%;
    }

    .pa-md-3 {
      padding: 12px !important;
    }

    .symbol {
      max-width: 5rem;
    }
  }
  @media only screen and (min-width: 960px) {
    margin-bottom: 3.75rem;
  }
  @media (min-width: 1264px) {
    .container {
      max-width: 1185px;
    }
    .mr-lg-6 {
      margin-right: 24px !important;
    }

    .col-lg-8 {
      flex: 0 0 66.6666666667%;
      max-width: 66.6666666667%;
    }

    .col-lg-4 {
      flex: 0 0 33.3333333333%;
      max-width: 33.3333333333%;
    }
  }
`;
