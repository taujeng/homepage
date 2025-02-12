
export const Storage = {
  // Get all dashboard data
  getData: () => {
    const data = localStorage.getItem('HomePage');
    return data ? JSON.parse(data) : { widgets: {}, layout: {}, global: {} };
  },

  // Get specific widget data
  getWidget: (widgetName) => {
    const localData = Storage.getData();
    if (localData.widgets?.[widgetName]) {
      return localData.widgets[widgetName]
    } else {
      console.log(`error. Widget ${widgetName} doesn't exist in local storage.`)
      return null;
    }
  },

  // Save widget data
  saveWidget: (widgetId, data) => {
    const dashboard = Storage.getData();
    dashboard.widgets[widgetId] = {
      ...dashboard.widgets[widgetId],
      ...data
    };
    localStorage.setItem('dashboardData', JSON.stringify(dashboard));
  },

  // Clear widget data
  clearWidget: (widgetId) => {
    const dashboard = Storage.getData();
    delete dashboard.widgets[widgetId];
    localStorage.setItem('dashboardData', JSON.stringify(dashboard));
  }
};