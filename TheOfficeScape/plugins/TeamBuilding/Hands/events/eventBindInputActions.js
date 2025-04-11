export const id = "GRIM_EVENT_COUNTER_ATTACK";
export const name = "Event Input Counter Attack";
export const groups = ["EVENT_GROUP_INPUT", "EVENT_GROUP_CONTROL_FLOW"];
export const subGroups = {
  EVENT_GROUP_INPUT: "EVENT_GROUP_CONTROL_FLOW",
  EVENT_GROUP_CONTROL_FLOW: "EVENT_GROUP_INPUT",
};

export const fields =
[
    {
        key: "script",
        label: "Script",
        type: "events"
    }
];

export const compile = (input, helpers) =>
{
    const { inputScriptSet, ifInput, appendRaw, _compilePath } = helpers;

    inputScriptSet(["a", "left", "up", "right", "down"], true, input.script);
};