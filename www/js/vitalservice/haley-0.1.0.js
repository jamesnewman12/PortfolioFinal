if(typeof(VITAL_JSON_SCHEMAS) == 'undefined') {
 throw ("No VITAL_JSON_SCHEMAS list defined - vital-core domain unavailable");
}

var haley_0_1_0_schema = {
  "domainURI" : "http://vital.ai/ontology/haley",
  "name" : "haley-0.1.0",
  "vitalsignsVersion" : "0.2.304",
  "parents" : [ "http://vital.ai/ontology/vital-aimp" ],
  "schemas" : [ {
    "id" : "http://vital.ai/ontology/haley#Asset",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
      "http://vital.ai/ontology/haley#hasAssetID" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/haley#hasAssetType" : {
        "type" : "string"
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/haley#AssetConditionMessage",
    "parent" : "http://vital.ai/ontology/vital-aimp#AIMPMessage",
    "properties" : {
      "http://vital.ai/ontology/haley#hasAssetURI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/haley#hasHumidity" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/haley#hasTemperature" : {
        "type" : "number"
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/haley#AssetLocationMessage",
    "parent" : "http://vital.ai/ontology/vital-aimp#AIMPMessage",
    "properties" : {
      "http://vital.ai/ontology/haley#hasAssetURI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/haley#hasLocation" : {
        "type" : "object",
        "properties" : {
          "longitude" : {
            "type" : "number"
          },
          "latitude" : {
            "type" : "number"
          }
        },
        "required" : [ "longitude", "latitude" ],
        "additionalProperties" : false
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/haley#Edge_hasAccountAsset",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_TaxonomyEdge",
    "sourceDomains" : [ "http://vital.ai/ontology/haley#HaleyAccount" ],
    "destinationDomains" : [ "http://vital.ai/ontology/haley#Asset" ],
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/haley#HaleyAccount",
    "parent" : "http://vital.ai/ontology/vital#Account",
    "properties" : {
      "http://vital.ai/ontology/haley#isEnableEcho" : {
        "type" : "boolean"
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/haley#HaleyChannelAnswer",
    "parent" : "http://vital.ai/ontology/vital-aimp#AnswerMessage",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/haley#HaleyChannelQuestion",
    "parent" : "http://vital.ai/ontology/vital-aimp#QuestionMessage",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/haley#LinkAccountRequest",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
      "http://vital.ai/ontology/haley#hasRandomCode" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-aimp#hasEchoUserID" : {
        "type" : "string"
      }
    }
  } ],
  "properties" : [ {
    "URI" : "http://vital.ai/ontology/haley#hasAssetID",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#Asset" ],
    "shortName" : "assetID",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley#hasAssetType",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#Asset" ],
    "shortName" : "assetType",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley#hasAssetURI",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#AssetConditionMessage", "http://vital.ai/ontology/haley#AssetLocationMessage" ],
    "shortName" : "assetURI",
    "multipleValues" : false,
    "type" : "URIProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley#hasHumidity",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#AssetConditionMessage" ],
    "shortName" : "humidity",
    "multipleValues" : false,
    "type" : "FloatProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley#hasLocation",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#AssetLocationMessage" ],
    "shortName" : "location",
    "multipleValues" : false,
    "type" : "GeoLocationProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley#hasRandomCode",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#LinkAccountRequest" ],
    "shortName" : "randomCode",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley#hasTemperature",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#AssetConditionMessage" ],
    "shortName" : "temperature",
    "multipleValues" : false,
    "type" : "FloatProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley#isEnableEcho",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#HaleyAccount" ],
    "shortName" : "enableEcho",
    "multipleValues" : false,
    "type" : "BooleanProperty"
  } ]
};

 VITAL_JSON_SCHEMAS.push(haley_0_1_0_schema);