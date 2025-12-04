const appConstants = {
  apiEndpoint: import.meta.env.VITE_API_ENDPOINT,
  headerHeight: 64,
  sidebarWidth: 250,
  sidebarCollapsedWidth: 60,
};

type AppConstants = typeof appConstants & {
  [key: string]: string | number,
};

export default appConstants as AppConstants;
