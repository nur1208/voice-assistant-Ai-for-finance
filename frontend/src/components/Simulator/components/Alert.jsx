import React from "react";
import { Icon1 } from "../Icon1";
export const Alert = () => {
  return (
    <div
      role="alert"
      class="v-alert welcome-banner v-sheet theme--dark v-alert--dense v-alert--text info--text sim-warning-alert"
    >
      <div className="v-alert__wrapper">
        <span className="v-icon notranslate v-alert__icon theme--dark info--text">
          <Icon1 />
        </span>

        <div class="v-alert__content">
          <div class="row flex-sm-nowrap">
            <div class="sim-warning-alert__message flex-grow-1 flex-shrink-1 col-sm-auto col-12">
              Welcome to the new Simulator - we have officially switched over
              from the old version. Get trading and have fun!
            </div>{" "}
            <div class="flex-grow-0 flex-shrink-0 text-right pt-0 pt-sm-3 col-sm-auto col-12">
              <button
                type="button"
                class="sim-warning-alert__button text-right text-h6 v-btn v-btn--text theme--dark v-size--default primary--text"
              >
                <span class="v-btn__content">Close</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
