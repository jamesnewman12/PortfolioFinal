if(typeof(VITAL_JSON_SCHEMAS) == 'undefined') {
 throw ("No VITAL_JSON_SCHEMAS list defined - vital-core domain unavailable");
}

var haley_0_1_0_schema = {
  "domainURI" : "http://vital.ai/ontology/haley",
  "name" : "haley-0.1.0",
  "version" : "0.1.0",
  "domainOWLHash" : "1d8ceabe23d721d7d3f511bcf57e5bac",
  "vitalsignsVersion" : "0.2.304",
  "parents" : [ "http://vital.ai/ontology/vital-aimp" ],
  "schemas" : [ {
    "id" : "http://vital.ai/ontology/haley#Customer",
    "parent" : "http://vital.ai/ontology/haley#HaleyAccount",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/haley#DialogTask",
    "parent" : "http://vital.ai/ontology/haley#HaleyTask",
    "properties" : {
      "http://vital.ai/ontology/haley#hasDialogURI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/haley#hasEntityURI" : {
        "type" : "string"
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/haley#GlobalManager",
    "parent" : "http://vital.ai/ontology/haley#HaleyAccount",
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
    "id" : "http://vital.ai/ontology/haley#HaleyAppEvent",
    "parent" : "http://vital.ai/ontology/vital-aimp#AIMPEvent",
    "properties" : {
      "http://vital.ai/ontology/haley#hasEventDetails" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/haley#hasEventObjectURI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/haley#hasEventType" : {
        "type" : "string"
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
    "id" : "http://vital.ai/ontology/haley#HaleyCryptoKey",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
      "http://vital.ai/ontology/haley#hasEncryptedKey" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/haley#hasKeySubject" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/haley#hasKeySubjectIdentity" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-aimp#hasKeyHash" : {
        "type" : "string"
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/haley#HaleyTask",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
      "http://vital.ai/ontology/haley#hasExceptionMessage" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/haley#hasLastAttemptTime" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/haley#hasOwner" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/haley#hasScheduledExecutionTime" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/haley#hasStatus" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/haley#hasStatusMessage" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/haley#isTopPriority" : {
        "type" : "boolean"
      },
      "http://vital.ai/ontology/vital-aimp#hasStackTrace" : {
        "type" : "string"
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/haley#HaleyUserEvent",
    "parent" : "http://vital.ai/ontology/haley#HaleyAppEvent",
    "properties" : {
      "http://vital.ai/ontology/haley#hasLoginURI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/haley#hasLoginUsername" : {
        "type" : "string"
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/haley#Seller",
    "parent" : "http://vital.ai/ontology/haley#HaleyAccount",
    "properties" : {
    }
  } ],
  "properties" : [ {
    "URI" : "http://vital.ai/ontology/haley#hasDialogURI",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#DialogTask" ],
    "shortName" : "dialogURI",
    "multipleValues" : false,
    "type" : "URIProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley#hasEncryptedKey",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#HaleyCryptoKey" ],
    "shortName" : "encryptedKey",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley#hasEntityURI",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#DialogTask" ],
    "shortName" : "entityURI",
    "multipleValues" : false,
    "type" : "URIProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley#hasEventDetails",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#HaleyAppEvent" ],
    "shortName" : "eventDetails",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley#hasEventObjectURI",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#HaleyAppEvent" ],
    "shortName" : "eventObjectURI",
    "multipleValues" : false,
    "type" : "URIProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley#hasEventType",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#HaleyAppEvent" ],
    "shortName" : "eventType",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley#hasExceptionMessage",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#HaleyTask" ],
    "shortName" : "exceptionMessage",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley#hasKeySubject",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#HaleyCryptoKey" ],
    "shortName" : "keySubject",
    "multipleValues" : false,
    "type" : "URIProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley#hasKeySubjectIdentity",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#HaleyCryptoKey" ],
    "shortName" : "keySubjectIdentity",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley#hasLastAttemptTime",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#HaleyTask" ],
    "shortName" : "lastAttemptTime",
    "multipleValues" : false,
    "type" : "DateProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley#hasLoginURI",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#HaleyUserEvent" ],
    "shortName" : "loginURI",
    "multipleValues" : false,
    "type" : "URIProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley#hasLoginUsername",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#HaleyUserEvent" ],
    "shortName" : "loginUsername",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley#hasOwner",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#HaleyTask" ],
    "shortName" : "owner",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley#hasScheduledExecutionTime",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#HaleyTask" ],
    "shortName" : "scheduledExecutionTime",
    "multipleValues" : false,
    "type" : "DateProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley#hasStatus",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#HaleyTask" ],
    "shortName" : "status",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley#hasStatusMessage",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#HaleyTask" ],
    "shortName" : "statusMessage",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley#isEnableEcho",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#HaleyAccount" ],
    "shortName" : "enableEcho",
    "multipleValues" : false,
    "type" : "BooleanProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley#isTopPriority",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley#HaleyTask" ],
    "shortName" : "topPriority",
    "multipleValues" : false,
    "type" : "BooleanProperty"
  } ]
};

VITAL_JSON_SCHEMAS.push(haley_0_1_0_schema);

if(typeof(module) !== 'undefined') {

  module.exports = haley_0_1_0_schema;

}