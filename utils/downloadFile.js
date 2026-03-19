import fs from "fs";
import path from "path";
import { Readable } from "stream";
import { finished } from "stream/promises";

const downloadFile = async (url, filepath) => {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(15000),
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64; rv:115.0) Gecko/20100101 Firefox/115.0",
    },
  });

  if (!response.ok) {
    console.error(
      "downloadFile:",
      "Download Failed:",
      "Status:",
      response.status,
    );
    throw new Error(
      `Failed to download: ${response.status} ${response.statusText}`,
    );
  }

  if (!response.body) {
    throw new Error("downloadFile: response body is empty.");
  }

  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  const fileStream = fs.createWriteStream(filepath);
  const body = Readable.fromWeb(response.body);
  await finished(body.pipe(fileStream));
};
export default downloadFile;
