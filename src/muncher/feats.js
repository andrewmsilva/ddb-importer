// Main module class
import DDBMuncher from "../apps/DDBMuncher.js";
import { getFeats } from "./feats/feats.js";
import { getCobalt } from "../lib/Secrets.js";
import { getCampaignId } from "../lib/DDBCampaigns.js";
import FileHelper from "../lib/FileHelper.js";
import SETTINGS from "../settings.js";
import DDBProxy from "../lib/DDBProxy.js";
import PatreonHelper from "../lib/PatreonHelper.js";

function getFeatData() {
  const cobaltCookie = getCobalt();
  const campaignId = getCampaignId();
  const parsingApi = DDBProxy.getProxy();
  const betaKey = PatreonHelper.getPatreonKey();
  const body = { cobalt: cobaltCookie, campaignId: campaignId, betaKey: betaKey };
  const debugJson = game.settings.get(SETTINGS.MODULE_ID, "debug-json");

  return new Promise((resolve, reject) => {
    fetch(`${parsingApi}/proxy/feats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (debugJson) {
          FileHelper.download(JSON.stringify(data), `feats-raw.json`, "application/json");
        }
        if (!data.success) {
          DDBMuncher.munchNote(`Failure: ${data.message}`);
          reject(data.message);
        }
        return data;
      })
      .then((data) => getFeats(data.data))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

export async function parseFeats() {
  const results = await getFeatData();

  return results;
}


