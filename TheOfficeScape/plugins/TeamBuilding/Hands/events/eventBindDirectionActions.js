export const id = "GRIM_EVENT_DIRECTION_ACTION";
export const name = "Event Input Direction Action";
export const groups = ["EVENT_GROUP_INPUT", "EVENT_GROUP_CONTROL_FLOW", "EVENT_GROUP_ACTOR"];
export const subGroups = {
    EVENT_GROUP_INPUT: "EVENT_GROUP_CONTROL_FLOW",
    EVENT_GROUP_CONTROL_FLOW: "EVENT_GROUP_INPUT",
    EVENT_GROUP_ACTOR: "EVENT_GROUP_ACTIONS"
};

export const fields =
[
  {
      key: "launchEvent",
      label: "Hand Hit Event",
      type: "events"
  }
];

export const compile = (input, helpers) => 
{
  const
  {
      ifInput,
      _compilePath,
      callScript
  } = helpers;
  const { launchEvent } = input;

  function printf(txt)
  {
      appendRaw
      (`VM_SWITCH_TEXT_LAYER .TEXT_LAYER_BKG
          VM_LOAD_TEXT 0
          .asciz "${txt}"
          VM_DISPLAY_TEXT`);
  }

  function projectileCheck(script, direction)
  {
      const offset = 16;
      const dirXs = { "left" : -1, "right" : 1, "up" : 0, "down" : 0 };
      const dirYs = { "left" : 0, "right" : 0, "up" : 1, "down" : -1 };
      script[0].args.direction = direction;
      script[0].args.x = dirXs[direction] * offset;
      script[0].args.y = dirYs[direction] * offset;
      
      _compilePath(script);
      
  }

  ifInput("a", () =>
  {
      ifInput("left",   () => { projectileCheck(launchEvent, "left"); });
      ifInput("up",     () => { projectileCheck(launchEvent, "up"); });
      ifInput("right",  () => { projectileCheck(launchEvent, "right"); });
      ifInput("down",   () => { projectileCheck(launchEvent, "down"); });
  });
};