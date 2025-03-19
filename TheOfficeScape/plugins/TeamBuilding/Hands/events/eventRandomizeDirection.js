export const id = "GRIM_RANDOMIZE_DIRECTION";
export const groups = ["EVENT_GROUP_ACTOR"];
export const subGroups = { EVENT_GROUP_ACTOR: "EVENT_GROUP_PROPERTIES" };
export const name = "Randomize Direction";
export const fields =
[
    {
        key: "actorId",
        label: "Actor",
        type: "actor",
        defaultValue: "$self$"
    },
    {
        key: "bIsLeftHand",
        label: "Is Left Hand",
        type: "checkbox"
    }
];

export const compile = (input, helpers) => {
    const {
        variableSetToRandom,
        seedRng,
        actorSetActive,
        actorSetPosition,
        actorSetDirection,
        actorMoveToVariables,
        actorGetPosition,
        actorShow,
        appendRaw,
        temporaryEntityVariable,
        ifVariableValue,
        actorStartUpdate,
        actorStopUpdate,
        actorMoveTo,
        wait,
        scene
    } = helpers;

    function printf(txt)
    {
        appendRaw
        (`VM_SWITCH_TEXT_LAYER .TEXT_LAYER_BKG
            VM_LOAD_TEXT 0
            .asciz "${txt}"
            VM_DISPLAY_TEXT`);
    }

    const dir = temporaryEntityVariable(0);
    seedRng();
    variableSetToRandom(dir, 0, 2);

    const w = scene.width;
    const h = scene.height;

    const x = -1;
    const y = 0;

    const xMid = Math.floor(w/2)-1;
    const yMid = Math.floor(h/2)-1;

    actorSetActive(input.actorId);
    // actorStopUpdate();

    let bIsHorizontal = true;

    if(input.bIsLeftHand == true)
    {
        // DIR: Up
        ifVariableValue(dir, ".EQ", 0, () =>
        {
            // printf("DIR_UP   ");
            actorSetDirection("up");
            actorSetPosition(xMid, h-1, "tiles");
            bIsHorizontal = false;
        });
        // DIR: Left
        ifVariableValue(dir, ".EQ", 1, () =>
        {
            // printf("DIR_LEFT ");
            actorSetDirection("left");
            actorSetPosition(w-1, yMid, "tiles");
        });
    }
    else
    {
        // DIR: Down
        ifVariableValue(dir, ".EQ", 0, () =>
        {
            // printf("DIR_DOWN ");
            actorSetDirection("down");
            actorSetPosition(xMid, y, "tiles");
            bIsHorizontal = false;
        });
        // DIR: Right
        ifVariableValue(dir, ".EQ", 1, () =>
        {
            // printf("DIR_RIGHT");
            actorSetDirection("right");
            actorSetPosition(x, yMid, "tiles");
        });
    }

    wait(2);

    const pX = temporaryEntityVariable(2);
    const pY = temporaryEntityVariable(3);

    actorSetActive("player");
    actorGetPosition(pX, pY, "tiles");

    actorSetActive(input.actorId);

    actorShow(input.actorId);
    actorMoveToVariables(pX, pY, "tiles");
    // actorStartUpdate();
};