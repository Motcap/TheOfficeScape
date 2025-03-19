export const id = "GRIM_EVENT_DIRECTION_ACTION";
export const name = "Event Input Direction Action";
export const groups = ["EVENT_GROUP_INPUT", "EVENT_GROUP_CONTROL_FLOW"];
export const subGroups = {
  EVENT_GROUP_INPUT: "EVENT_GROUP_CONTROL_FLOW",
  EVENT_GROUP_CONTROL_FLOW: "EVENT_GROUP_INPUT",
};

export const fields =
[
    // {
    //     key: "EVENT",
    //     label: "Automatic Event",
    //     description: "Automatically binds A + *Dir inputs for Hand Slap Counterattack",
    //     type: "custom"
    // },
    {
        key: "handR",
        label: "Hand R",
        type: "actor"
    },
    {
        key: "handL",
        label: "Hand L",
        type: "actor"
    },
    {
        key: "handHitEvent",
        label: "Hand Hit Event",
        type: "customEvent"
    }
];

export const compile = (input, helpers) => {
    const {
        ifInput,
        actorSetActive,
        actorSetDirection,
        actorGetPosition,
        actorSetPosition,
        temporaryEntityVariable,
        ifVariableValue,
        actorStopUpdate,
        actorHide,
        callScript,
        getVariableAlias,
        appendRaw
    } = helpers;
    const { handL, handR, handHitEvent } = input;


    const aX = temporaryEntityVariable(1);
    const aY = temporaryEntityVariable(2);

    function printf(txt)
    {
        appendRaw
        (`VM_SWITCH_TEXT_LAYER .TEXT_LAYER_BKG
            VM_LOAD_TEXT 0
            .asciz "${txt}"
            VM_DISPLAY_TEXT`);
    }

    function checkActor(actor, checkHorizontal, operator, checkVal, script)
    {
        actorSetActive(actor);
        actorGetPosition(aX, aY, "tiles");

        const eqVal = checkHorizontal ? 8 : 9;
        const eqAxis = checkHorizontal ? aY : aX;
        const neAxis = checkHorizontal ? aX : aY;

        ifVariableValue(eqAxis, ".EQ", eqVal, () =>
        {
            ifVariableValue(neAxis, operator, checkVal, () =>
            {
                actorSetPosition(0, 0);
                callScript(script);
            });
        });
    }

    ifInput("a", () =>
    {
        ifInput("left", () =>
        {
            checkActor(handR, true, ".GTE", 6, handHitEvent);
        });
        ifInput("up", () =>
        {
            checkActor(handR, false, ".GTE", 5, handHitEvent);
        });
        ifInput("right", () =>
        {
            checkActor(handL, true, ".LTE", 13, handHitEvent);
        });
        ifInput("down", () =>
        {
            checkActor(handL, false, ".LTE", 11, handHitEvent);
        });
    });
};