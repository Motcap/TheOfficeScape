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
    {
        key: "action",
        label: "Attack Player",
        type: "events"
    }
];

export const compile = (input, helpers) =>
{
    const
    {
        actorSetActive,
        ifActorDistanceFromActor,
        actorMoveCancel,
        callScript
    } = helpers;
    const { actorId } = input;

    actorSetActive(actorId);

    ifActorDistanceFromActor(2, ".LTE", "player", () =>
    {
        actorMoveCancel();
        callScript(input.action);
    });
};