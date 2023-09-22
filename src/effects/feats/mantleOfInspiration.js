import DDBMacros from "../macros.js";

export async function mantleOfInspirationEffect(document) {
  await DDBMacros.setItemMacroFlag(document, "feat", "mantleOfInspiration.js");
  DDBMacros.setMidiOnUseMacroFlag(document, "feat", "mantleOfInspiration.js", ["preTargeting"]);

  return document;
}
