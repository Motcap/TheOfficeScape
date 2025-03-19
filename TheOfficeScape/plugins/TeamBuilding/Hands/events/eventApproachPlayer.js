export const id = "GRIM_APPROACH_PLAYER";
export const groups = ["EVENT_GROUP_ACTOR"];
export const subGroups = { EVENT_GROUP_ACTOR: "EVENT_GROUP_PROPERTIES" };
export const name = "Approach Player";
export const fields =
[
    {
        key: "actorId",
        label: "Actor",
        type: "actor",
        defaultValue: "$self$"
    },
    // {
    //     type: "group",
    //     fields:
    //     [{
    //         key: "actorX",
    //         label: "Actor X",
    //         type: "variable",
    //         defaultValue: "LAST_VARIABLE",
    //         width: "50%"
    //     },
    //     {
    //         key: "actorY",
    //         label: "Actor Y",
    //         type: "variable",
    //         defaultValue: "LAST_VARIABLE",
    //         width: "50%"
    //     }]
    // },
    // {
    //     type: "group",
    //     fields:        
    //     [{
    //         key: "playerX",
    //         label: "Player X",
    //         type: "variable",
    //         defaultValue: "LAST_VARIABLE",
    //         width: "50%"
    //     },
    //     {
    //         key: "playerY",
    //         label: "Player Y",
    //         type: "variable",
    //         defaultValue: "LAST_VARIABLE",
    //         width: "50%"
    //     }]
    // },
    {
        type: "customEvent",
        key: "customEventId",
        label: "On Hit Event",
        postUpdateFn: (newArgs, prevArgs) =>
        {
            // Reset args if custom event changed
            if (newArgs.customEventId !== prevArgs.customEventId)
            {
              return { customEventId: newArgs.customEventId };
            }
            else { return newArgs; }
        },
    },
    {
        type: "break",
    }
];

export const compile = (input, helpers) => {
    const {
        actorSetActive,
        ifVariableCompare,
        ifActorDistanceFromActor,
        actorMoveToVariables,
        actorMoveRelative,
        actorGetPosition,
        actorSetPosition,
        actorHide,
        actorStopUpdate,
        temporaryEntityVariable,
        wait,
        callScript
    } = helpers;
    const { actorId, /*actorX, actorY, playerX, playerY*/ } = input;

    const pX = temporaryEntityVariable(2);
    const pY = temporaryEntityVariable(3);

    actorSetActive("player");
    actorGetPosition(pX, pY, "tiles");

    const aX = temporaryEntityVariable(0);
    const aY = temporaryEntityVariable(1);

    actorSetActive(actorId);
    // actorGetPosition(actorX, actorY, "tiles");
    // actorMoveToVariables(pX, pY, "tiles");

    // function moveActor(bIsPositive, bIsHorizontal)
    // {
    //     const x = bIsHorizontal ? (bIsPositive ? 1 : -1) : 0;
    //     const y = !bIsHorizontal ? (bIsPositive ? 1 : -1) : 0;
    //     const dir = bIsHorizontal ? "horizontal" : "vertical";
    //     // actorMoveRelative(x, y, true, dir, "tiles");
    //     actorMoveToVariables(pX, pY, true, dir, "tiles");
    // }

    // // Vertical Check
    // ifVariableCompare(aY, ".LT", pY, () => { moveActor(true, false); });
    // ifVariableCompare(aY, ".GT", pY, () => { moveActor(false, false); });
    // // Horizontal Check
    // ifVariableCompare(aX, ".GT", pX, () => { moveActor(false, true); });
    // ifVariableCompare(aX, ".LT", pX, () => { moveActor(true, true); });
        
    ifActorDistanceFromActor(2, ".LTE", "player", () =>
    {
        callScript(input.customEventId, input);
        // actorHide(actorId);
        actorSetPosition(0, 0);
        // actorStopUpdate();
    });

    // wait(8, "frames");
};