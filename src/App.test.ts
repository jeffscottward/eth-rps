//css-tricks.com/model-based-testing-in-react-with-state-machines/

https: import React from "react";
import Feedback from "./App";
import { Machine } from "xstate";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { assert } from "chai";
import { createModel } from "@xstate/test";

describe("feedback app", () => {
  const feedbackMachine = Machine({
    /* ... */
  });
  const testModel = createModel(feedbackMachine).withEvents({
    /* ... */
  });

  const testPlans = testModel.getSimplePathPlans();
  testPlans.forEach(plan => {
    describe(plan.description, () => {
      afterEach(cleanup);
      plan.paths.forEach(path => {
        it(path.description, () => {
          const rendered = render(<Feedback />);
          return path.test(rendered);
        });
      });
    });
  });

  it("coverage", () => {
    testModel.testCoverage();
  });
});
