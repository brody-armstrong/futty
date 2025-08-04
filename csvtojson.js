import csvtojson from "csvtojson";
import fs from "fs";

csvtojson()
  .fromFile("players_with_team_names_sorted.csv")
  .then((jsonObj) => {
    fs.writeFileSync("public/players.json", JSON.stringify(jsonObj, null, 2));
    console.log("✅ Players saved to public/players.json");
  });
