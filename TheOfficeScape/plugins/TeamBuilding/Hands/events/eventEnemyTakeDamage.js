export const id = "GRIM_EVENT_HAND_DAMAGED";
export const name = "Event Hand Damaged";

export const fields =
[
    // {
    //     key: "actorId",
    //     label: "Hand ID",
    //     type: "actor"
    // }
];

export const compile = (input, helpers) => {
    const {
        getVariableAlias,
        actorSetActive,
        appendRaw
    } = helpers;
    // const { actorId } = input;

    function printf(txt)
    {
        appendRaw
        (`VM_SWITCH_TEXT_LAYER .TEXT_LAYER_BKG
            VM_LOAD_TEXT 0
            .asciz "${txt}"
            VM_DISPLAY_TEXT`);
    }

    // actorSetActive(actorId);
    printf(`HAND HIT!`);
};