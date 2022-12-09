const renderHTML = (payload) => {
  const widget = JSON.parse(payload)
  return `${atob(widget.body.styles)}${atob(widget.body.structure)}`;
};

const supportedAPI = ["init"];

/**
    The main entry of the application
    */
function app(window) {
  console.log("PricingFlow is starting");

  // set default configurations
  let configurations = {
    someDefaultConfiguration: false,
  };

  // all methods that were called till now and stored in queue
  // needs to be called now
  let globalObject = window[window["pricingFlow"]];
  let queue = globalObject.q;
  if (queue) {
    for (var i = 0; i < queue.length; i++) {
      if (queue[i][0].toLowerCase() == "init") {
        configurations = extendObject(configurations, queue[i][1]);
        console.log("PricingFlow started", configurations);

        getWidget(configurations);
      } else apiHandler(queue[i][0], queue[i][1]);
    }
  }

  // override temporary (until the app loaded) handler
  // for widget's API calls
  globalObject = apiHandler;
  globalObject.configurations = configurations;
}

/**
    Method that handles all API calls
    */
function apiHandler(api, params) {
  if (!api) throw Error("API method required");
  api = api.toLowerCase();

  if (supportedAPI.indexOf(api) === -1)
    throw Error(`Method ${api} is not supported`);

  console.log(`Handling API call ${api}`, params);

  switch (
    api
    // case "message":
    //     let pricingTable = document.createElement("div");
    //     pricingTable.innerHTML = renderHTML(params);
    //     document.body.appendChild(pricingTable);
    //   break;
    // default:
    //   console.warn(`No handler defined for ${api}`);
  ) {
  }
}


function getWidget(configurations) {
  // TODO - make an api call with the api key

  // 1. Create a new XMLHttpRequest object
  let xhr = new XMLHttpRequest();

  // 2. Configure it: GET-request for the URL /article/.../load
  xhr.open(
    "GET",
    `http://localhost:3000/widgets/apikey/${configurations.apikey}`
  );

  // 3. Send the request over the network
  xhr.send();

  // 4. This will be called after the response is received
  xhr.onload = function () {
    if (xhr.status != 200) {
      // analyze HTTP status of the response
      console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    } else {
      // show the result
      console.log(`Done, got ${xhr.response.length} bytes`); // response is the server response
      // console.log(xhr.response);
      let pricingTable = document.createElement("div");
      pricingTable.innerHTML = renderHTML(xhr.response);
      document.body.appendChild(pricingTable);
    }
  };

  xhr.onprogress = function (event) {
    if (event.lengthComputable) {
      console.log(`Received ${event.loaded} of ${event.total} bytes`);
    } else {
      console.log(`Received ${event.loaded} bytes`); // no Content-Length
    }
  };

  xhr.onerror = function () {
    console.log("Request failed");
  };
}


function extendObject(a, b) {
  for (var key in b) if (b.hasOwnProperty(key)) a[key] = b[key];
  return a;
}

app(window);
