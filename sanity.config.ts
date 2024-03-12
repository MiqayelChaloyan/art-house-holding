import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schema } from './sanity/schema';
import { visionTool } from '@sanity/vision';
import { apiVersion, dataset, projectId, title, basePath } from './sanity/env'
import { dashboardTool, projectUsersWidget, projectInfoWidget } from '@sanity/dashboard';

import myStructure from './sanity.structure';

const config = defineConfig(
  {
    projectId,
    dataset,
    title,
    apiVersion,
    basePath,
    plugins: [
      deskTool({
        structure: myStructure,
      }),
      dashboardTool({
        widgets: [
          projectInfoWidget(),
          projectUsersWidget(),
        ],
      }),
      visionTool({
        defaultApiVersion: apiVersion,
        defaultDataset: dataset,
      }),

    ],

    schema,


  }
);

export default config;


