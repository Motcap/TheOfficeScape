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
        scene
    } = helpers;

    const dir = temporaryEntityVariable(0);
    seedRng();
    variableSetToRandom(dir, 0, 2);

    const w = scene.width;
    const h = scene.height;

    const x = -1;
    const y = 0;

    const xMid = Math.floor(w/2)-1;
    const yMid = Math.floor(h/2)-1;

    // Store Player Position
    const pX = temporaryEntityVariable(2);
    const pY = temporaryEntityVariable(3);

    actorSetActive("player");
    actorGetPosition(pX, pY, "tiles");

    // Set HAND Position

    actorSetActive(input.actorId);

    if(input.bIsLeftHand == true)
    {
        // DIR: Up
        ifVariableValue(dir, ".EQ", 0, () =>
        {
            actorSetDirection("up");
            actorSetPosition(xMid, h-1, "tiles");
        });
        // DIR: Left
        ifVariableValue(dir, ".EQ", 1, () =>
        {
            actorSetDirection("left");
            actorSetPosition(w-1, yMid, "tiles");
        });
    }
    else
    {
        // DIR: Down
        ifVariableValue(dir, ".EQ", 0, () =>
        {
            actorSetDirection("down");
            actorSetPosition(xMid, y, "tiles");
        });
        // DIR: Right
        ifVariableValue(dir, ".EQ", 1, () =>
        {
            actorSetDirection("right");
            actorSetPosition(x, yMid, "tiles");
        });
    }

    actorShow(input.actorId);
    actorMoveToVariables(pX, pY, "tiles");
};