let showLoader;
let hideLoader;

export const setLoaderHandlers = (show, hide) => {
  showLoader = show;
  hideLoader = hide;
};

export const startLoader = () => {
  if (showLoader) showLoader();
};

export const stopLoader = () => {
  if (hideLoader) hideLoader();
};