/* eslint-disable no-extend-native */
import fetch from "node-fetch";
import cheerio from "cheerio";

declare global {
    interface String {
        substringBefore(before : string) : string;
        substringAfter(before : string) : string;
    }
}

String.prototype.substringBefore = function(before:string) {
  return this.substring(0, this.indexOf(before));
};

String.prototype.substringAfter = function(after:string) {
  return this.substring(this.indexOf(after)+after.length, this.length);
};

async function parse(url:string) {
  const res = (await (await fetch(url)).text());
  const $ = cheerio.load(res);
  const scr = $("#dlbutton").parent().find("script").html();
  let link = url.substringBefore("/v/");
  const numbs = scr!.substringAfter("\" + (").substringBefore(") + \"");
  const firstString = scr!.substringAfter(" = \"").substringBefore("\" + (");
  const num = parseInt(numbs.substringBefore(" % "));
  const lastString = scr!.substringAfter("913) + \"").substringBefore("\";");
  const nums = num % 51245 + num % 913;
  link += firstString + nums.toString() + lastString;
  console.log(url);
  return {link};
}

export {parse};
