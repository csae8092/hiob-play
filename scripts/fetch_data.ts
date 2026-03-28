import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { data_mapping, data_repo_url } from '../src/lib/constants';

type DataMap = typeof data_mapping;

async function fetchData(): Promise<void> {
  const outputDir = join(process.cwd(), 'static', 'data');
  await mkdir(outputDir, { recursive: true });

  for (const key of Object.keys(data_mapping) as Array<keyof DataMap>) {
    const { file } = data_mapping[key];
    const downloadUrl = `${data_repo_url}${file}`;
    const outputPath = join(outputDir, file);

    const response = await fetch(downloadUrl);
    if (!response.ok) {
      throw new Error(`Failed to download ${downloadUrl}: ${response.status} ${response.statusText}`);
    }

    const content = await response.text();
    await writeFile(outputPath, content, 'utf8');
    console.log(`Saved ${outputPath}`);
  }
}

fetchData().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});