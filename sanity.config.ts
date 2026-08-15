import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schema } from './sanity/schema';
import { visionTool } from '@sanity/vision';
import { apiVersion, dataset, projectId, title, basePath } from './sanity/env';
import { dashboardTool, projectUsersWidget, projectInfoWidget } from '@sanity/dashboard';

import { BsDatabaseFillGear } from 'react-icons/bs';

import Structure from './sanity.structure';
import { MonitoringSettingsPublishAction } from './sanity/documentActions/monitoringSettingsPublish';
import {
  ANALYTICS_SYSTEM_TYPES,
  filterAnalyticsDocumentActions,
  filterMonitoringSettingsActions,
} from './sanity/config/monitoring-access';

const config = defineConfig(
  {
    projectId,
    dataset,
    title,
    apiVersion,
    basePath,
    schema,
    icon: BsDatabaseFillGear,
    plugins: [
      deskTool({
        structure: Structure,
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
    document: {
      newDocumentOptions: (prev, { creationContext }) => {
        const schemaType = creationContext.type;
        if (ANALYTICS_SYSTEM_TYPES.includes(schemaType as (typeof ANALYTICS_SYSTEM_TYPES)[number])) {
          return [];
        }
        return prev;
      },
      actions: (prev, { schemaType }) => {
        let actions = prev;

        if (schemaType === 'monitoringSettings') {
          actions = filterMonitoringSettingsActions(actions, schemaType);
          return actions.map((originalAction) => {
            const actionName = (originalAction as { action?: string }).action;
            return actionName === 'publish' ? MonitoringSettingsPublishAction : originalAction;
          });
        }

        if (ANALYTICS_SYSTEM_TYPES.includes(schemaType as (typeof ANALYTICS_SYSTEM_TYPES)[number])) {
          return filterAnalyticsDocumentActions(actions, schemaType);
        }

        return actions;
      },
    },
  }
);

export default config;
