
export const loadABASDK = () => {
  return new Promise((resolve, reject) => {
    if (window.jQuery && window.AbaPayway) {
      console.log('✅ ABA SDK already loaded');
      return resolve(true);
    }

    const loadScript = (src, id) => {
      return new Promise((scriptResolve, scriptReject) => {
        if (document.getElementById(id)) {
          return scriptResolve(true);
        }
        const script = document.createElement('script');
        script.src = src;
        script.id = id;
        script.onload = () => scriptResolve(true);
        script.onerror = () => scriptReject(new Error(`Failed to load script: ${src}`));
        document.body.appendChild(script);
      });
    };

    console.log('🔄 Loading ABA SDK dependencies...');
    
    loadScript('https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js', 'jquery-script')
      .then(() => {
        console.log('✅ jQuery loaded');
        return loadScript('https://checkout-sandbox.payway.com.kh/plugins/checkout2-0.js', 'aba-sdk-script');
      })
      .then(() => {
        console.log('✅ ABA SDK loaded');
        resolve(true);
      })
      .catch((err) => {
        console.error('❌ Error loading ABA SDK:', err);
        reject(err);
      });
  });
};
