import React, { useEffect } from 'react';

const TradingViewWidget = ({ symbol }) => {
  useEffect(() => {
    console.log('Data type of symbol:', typeof symbol);
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        "container_id": "technical-analysis-chart-demo",
        "width": "800",
        "height": "500",
        "autosize": false,
        "symbol": symbol, 
        "interval": "D",
        "timezone": "exchange",
        "theme": "light",
        "style": "1",
        "withdateranges": true,
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "save_image": false,
        "studies": [
          "ROC@tv-basicstudies",
          "StochasticRSI@tv-basicstudies",
          "MASimple@tv-basicstudies"
        ],
        "show_popup_button": true,
        "popup_width": "500",
        "popup_height": "500",
        "support_host": "https://www.tradingview.com",
        "locale": "en"
      });
    };
    document.body.appendChild(script);

    return () => {
     

      document.body.removeChild(script);
    };
  }, [symbol]);

  return (
    <div className="tradingview-widget-container" style={{ height: '100%', width: '100%',marginLeft:'5%' }}>
      <div id="technical-analysis-chart-demo" style={{ height: 'calc(100% - 32px)', width: '100%' }} />
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          {/* <span className="blue-text">Track all markets on TradingView</span> */}
        </a>
      </div>
    </div>
  );
};

export default TradingViewWidget;
