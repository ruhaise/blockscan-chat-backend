"use strict";

const axios = require("axios").default;
const FormData = require("form-data");

module.exports = async function (fastify, opts) {
  fastify.post("/sendchat", async function (request, reply) {
    fastify.register(require("@fastify/cors"));
    const { apiKey, addresses, message } = request.body;

    const data1 = new FormData();
    data1.append("method", "sendchat");
    data1.append("apikey", apiKey);
    data1.append("to", addresses[0]);
    data1.append("msg", message);

    const data2 = new FormData();
    data2.append("method", "sendchat");
    data2.append("apikey", apiKey);
    data2.append("to", addresses[1]);
    data2.append("msg", message);

    const data3 = new FormData();
    data3.append("method", "sendchat");
    data3.append("apikey", apiKey);
    data3.append("to", addresses[2]);
    data3.append("msg", message);

    const data4 = new FormData();
    data4.append("method", "sendchat");
    data4.append("apikey", apiKey);
    data4.append("to", addresses[3]);
    data4.append("msg", message);

    const axiosFetcher = (data) => {
      axios({
        method: "post",
        url: "https://chatapi.blockscan.com/v1/api",
        data,
        headers: { "Content-Type": "multipart/form-data" },
      });
    };

    try {
      const responseData1 = axiosFetcher(data1);
      const responseData2 = axiosFetcher(data2);
      const responseData3 = axiosFetcher(data3);
      const responseData4 = axiosFetcher(data4);

      const response = await Promise.all([
        responseData1,
        responseData2,
        responseData3,
        responseData4,
      ]);

      return { success: true };
    } catch (err) {
      console.error("Error Sending Message ", err);
      return { success: false };
    }
  });
};
