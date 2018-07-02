if(typeof(VITAL_JSON_SCHEMAS) == 'undefined') {
 throw ("No VITAL_JSON_SCHEMAS list defined - vital-core domain unavailable");
}

var vital_social_0_2_304_schema = {
  "domainURI" : "http://vital.ai/ontology/vital-social",
  "name" : "vital-social-0.2.304",
  "vitalsignsVersion" : "0.2.304",
  "parents" : [ "http://vital.ai/ontology/vital-nlp" ],
  "schemas" : [ {
    "id" : "http://vital.ai/ontology/vital-social#DirectMessage",
    "parent" : "http://vital.ai/ontology/vital-nlp#Document",
    "$schema" : "http://json-schema.org/draft-04/schema#",
    "title" : "http://vital.ai/ontology/vital-social#DirectMessage",
    "description" : "Auto-generated schema for owl class: http://vital.ai/ontology/vital-social#DirectMessage",
    "type" : "object",
    "properties" : {
      "URI" : {
        "type" : "string"
      },
      "type" : {
        "enum" : [ "http://vital.ai/ontology/vital-social#DirectMessage" ]
      },
      "types" : {
        "type" : "array",
        "minItems" : 1,
        "items" : {
          "type" : "string"
        },
        "uniqueItems" : true
      },
      "http://vital.ai/ontology/vital#hasCertainty" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasDegree" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasPageRank" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasName" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasOntologyIRI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasProvenance" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasTimestamp" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasUpdateTime" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasVersionIRI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#isActive" : {
        "type" : "boolean"
      },
      "http://vital.ai/ontology/vital-nlp#hasBody" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasDmozPath" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasExtractedText" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasExtractedTitle" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasLang" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasPublicationDate" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-nlp#hasSentimentScore" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-nlp#hasSourceDomain" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasSourceName" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasTitle" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasUrl" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasUrlRoot" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#isSentimentMixed" : {
        "type" : "boolean"
      },
      "http://vital.ai/ontology/vital-social#hasRecipientID" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasRecipientName" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasRecipientScreenName" : {
        "type" : "string"
      }
    },
    "required" : [ "URI", "type" ],
    "additionalProperties" : false
  }, {
    "id" : "http://vital.ai/ontology/vital-social#Edge_hasFanCountry",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_TaxonomyEdge",
    "$schema" : "http://json-schema.org/draft-04/schema#",
    "title" : "http://vital.ai/ontology/vital-social#Edge_hasFanCountry",
    "description" : "Auto-generated schema for owl class: http://vital.ai/ontology/vital-social#Edge_hasFanCountry",
    "type" : "object",
    "sourceDomains" : [ "http://vital.ai/ontology/vital-social#SocialMediaAccount" ],
    "destinationDomains" : [ "http://vital.ai/ontology/vital-social#FanCountry" ],
    "properties" : {
      "URI" : {
        "type" : "string"
      },
      "type" : {
        "enum" : [ "http://vital.ai/ontology/vital-social#Edge_hasFanCountry" ]
      },
      "types" : {
        "type" : "array",
        "minItems" : 1,
        "items" : {
          "type" : "string"
        },
        "uniqueItems" : true
      },
      "http://vital.ai/ontology/vital#hasCertainty" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasEdgeDestination" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasEdgeSource" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasListIndex" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasOntologyIRI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasProvenance" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasTimestamp" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasUpdateTime" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasVersionIRI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#isActive" : {
        "type" : "boolean"
      }
    },
    "required" : [ "URI", "type" ],
    "additionalProperties" : false
  }, {
    "id" : "http://vital.ai/ontology/vital-social#Edge_hasSocialMediaAccount",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_TaxonomyEdge",
    "$schema" : "http://json-schema.org/draft-04/schema#",
    "title" : "http://vital.ai/ontology/vital-social#Edge_hasSocialMediaAccount",
    "description" : "Auto-generated schema for owl class: http://vital.ai/ontology/vital-social#Edge_hasSocialMediaAccount",
    "type" : "object",
    "sourceDomains" : [ "http://vital.ai/ontology/vital#Account" ],
    "destinationDomains" : [ "http://vital.ai/ontology/vital-social#SocialMediaAccount" ],
    "properties" : {
      "URI" : {
        "type" : "string"
      },
      "type" : {
        "enum" : [ "http://vital.ai/ontology/vital-social#Edge_hasSocialMediaAccount" ]
      },
      "types" : {
        "type" : "array",
        "minItems" : 1,
        "items" : {
          "type" : "string"
        },
        "uniqueItems" : true
      },
      "http://vital.ai/ontology/vital#hasCertainty" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasEdgeDestination" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasEdgeSource" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasListIndex" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasOntologyIRI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasProvenance" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasTimestamp" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasUpdateTime" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasVersionIRI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#isActive" : {
        "type" : "boolean"
      }
    },
    "required" : [ "URI", "type" ],
    "additionalProperties" : false
  }, {
    "id" : "http://vital.ai/ontology/vital-social#FacebookAccount",
    "parent" : "http://vital.ai/ontology/vital-social#SocialMediaAccount",
    "$schema" : "http://json-schema.org/draft-04/schema#",
    "title" : "http://vital.ai/ontology/vital-social#FacebookAccount",
    "description" : "Auto-generated schema for owl class: http://vital.ai/ontology/vital-social#FacebookAccount",
    "type" : "object",
    "properties" : {
      "URI" : {
        "type" : "string"
      },
      "type" : {
        "enum" : [ "http://vital.ai/ontology/vital-social#FacebookAccount" ]
      },
      "types" : {
        "type" : "array",
        "minItems" : 1,
        "items" : {
          "type" : "string"
        },
        "uniqueItems" : true
      },
      "http://vital.ai/ontology/vital#hasCertainty" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasDegree" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasPageRank" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasName" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasOntologyIRI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasProvenance" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasTimestamp" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasUpdateTime" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasVersionIRI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#isActive" : {
        "type" : "boolean"
      },
      "http://vital.ai/ontology/vital-social#hasAccessToken" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasCategory" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasFacebookID" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasLikesCount" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasPageFansCountry" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasPictureURL" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasUsername" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#isTokenValid" : {
        "type" : "boolean"
      }
    },
    "required" : [ "URI", "type" ],
    "additionalProperties" : false
  }, {
    "id" : "http://vital.ai/ontology/vital-social#FanCountry",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "$schema" : "http://json-schema.org/draft-04/schema#",
    "title" : "http://vital.ai/ontology/vital-social#FanCountry",
    "description" : "Auto-generated schema for owl class: http://vital.ai/ontology/vital-social#FanCountry",
    "type" : "object",
    "properties" : {
      "URI" : {
        "type" : "string"
      },
      "type" : {
        "enum" : [ "http://vital.ai/ontology/vital-social#FanCountry" ]
      },
      "types" : {
        "type" : "array",
        "minItems" : 1,
        "items" : {
          "type" : "string"
        },
        "uniqueItems" : true
      },
      "http://vital.ai/ontology/vital#hasCertainty" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasDegree" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasPageRank" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasName" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasOntologyIRI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasProvenance" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasTimestamp" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasUpdateTime" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasVersionIRI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#isActive" : {
        "type" : "boolean"
      },
      "http://vital.ai/ontology/vital-social#hasLikesCount" : {
        "type" : "number"
      }
    },
    "required" : [ "URI", "type" ],
    "additionalProperties" : false
  }, {
    "id" : "http://vital.ai/ontology/vital-social#InstagramAccount",
    "parent" : "http://vital.ai/ontology/vital-social#SocialMediaAccount",
    "$schema" : "http://json-schema.org/draft-04/schema#",
    "title" : "http://vital.ai/ontology/vital-social#InstagramAccount",
    "description" : "Auto-generated schema for owl class: http://vital.ai/ontology/vital-social#InstagramAccount",
    "type" : "object",
    "properties" : {
      "URI" : {
        "type" : "string"
      },
      "type" : {
        "enum" : [ "http://vital.ai/ontology/vital-social#InstagramAccount" ]
      },
      "types" : {
        "type" : "array",
        "minItems" : 1,
        "items" : {
          "type" : "string"
        },
        "uniqueItems" : true
      },
      "http://vital.ai/ontology/vital#hasCertainty" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasDegree" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasPageRank" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasName" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasOntologyIRI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasProvenance" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasTimestamp" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasUpdateTime" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasVersionIRI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#isActive" : {
        "type" : "boolean"
      },
      "http://vital.ai/ontology/vital-social#hasAccessToken" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasBio" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasFollowersCount" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasFollowingCount" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasInstagramID" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasLikesCount" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasMediaCount" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasPictureURL" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasUsername" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasWebsite" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#isTokenValid" : {
        "type" : "boolean"
      }
    },
    "required" : [ "URI", "type" ],
    "additionalProperties" : false
  }, {
    "id" : "http://vital.ai/ontology/vital-social#SocialMediaAccount",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "$schema" : "http://json-schema.org/draft-04/schema#",
    "title" : "http://vital.ai/ontology/vital-social#SocialMediaAccount",
    "description" : "Auto-generated schema for owl class: http://vital.ai/ontology/vital-social#SocialMediaAccount",
    "type" : "object",
    "properties" : {
      "URI" : {
        "type" : "string"
      },
      "type" : {
        "enum" : [ "http://vital.ai/ontology/vital-social#SocialMediaAccount" ]
      },
      "types" : {
        "type" : "array",
        "minItems" : 1,
        "items" : {
          "type" : "string"
        },
        "uniqueItems" : true
      },
      "http://vital.ai/ontology/vital#hasCertainty" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasDegree" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasPageRank" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasName" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasOntologyIRI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasProvenance" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasTimestamp" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasUpdateTime" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasVersionIRI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#isActive" : {
        "type" : "boolean"
      },
      "http://vital.ai/ontology/vital-social#hasAccessToken" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasLikesCount" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasPictureURL" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#isTokenValid" : {
        "type" : "boolean"
      }
    },
    "required" : [ "URI", "type" ],
    "additionalProperties" : false
  }, {
    "id" : "http://vital.ai/ontology/vital-social#SoundCloudAccount",
    "parent" : "http://vital.ai/ontology/vital-social#SocialMediaAccount",
    "$schema" : "http://json-schema.org/draft-04/schema#",
    "title" : "http://vital.ai/ontology/vital-social#SoundCloudAccount",
    "description" : "Auto-generated schema for owl class: http://vital.ai/ontology/vital-social#SoundCloudAccount",
    "type" : "object",
    "properties" : {
      "URI" : {
        "type" : "string"
      },
      "type" : {
        "enum" : [ "http://vital.ai/ontology/vital-social#SoundCloudAccount" ]
      },
      "types" : {
        "type" : "array",
        "minItems" : 1,
        "items" : {
          "type" : "string"
        },
        "uniqueItems" : true
      },
      "http://vital.ai/ontology/vital#hasCertainty" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasDegree" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasPageRank" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasName" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasOntologyIRI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasProvenance" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasTimestamp" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasUpdateTime" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasVersionIRI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#isActive" : {
        "type" : "boolean"
      },
      "http://vital.ai/ontology/vital-social#hasAccessToken" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasCity" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasCountry" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasDescription" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasDiscogsName" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasExpiresIn" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasFavoriteCount" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasFollowersCount" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasFollowingCount" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasLikesCount" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasMyspaceName" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasPermalink" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasPermalinkURL" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasPictureURL" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasPlaylistsCount" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasRefreshToken" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasSoundCloudID" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasSoundCloudURI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasTracksCount" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasUsername" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasWebsite" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasWebsiteTitle" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#isTokenValid" : {
        "type" : "boolean"
      }
    },
    "required" : [ "URI", "type" ],
    "additionalProperties" : false
  }, {
    "id" : "http://vital.ai/ontology/vital-social#Tweet",
    "parent" : "http://vital.ai/ontology/vital-nlp#Document",
    "$schema" : "http://json-schema.org/draft-04/schema#",
    "title" : "http://vital.ai/ontology/vital-social#Tweet",
    "description" : "Auto-generated schema for owl class: http://vital.ai/ontology/vital-social#Tweet",
    "type" : "object",
    "properties" : {
      "URI" : {
        "type" : "string"
      },
      "type" : {
        "enum" : [ "http://vital.ai/ontology/vital-social#Tweet" ]
      },
      "types" : {
        "type" : "array",
        "minItems" : 1,
        "items" : {
          "type" : "string"
        },
        "uniqueItems" : true
      },
      "http://vital.ai/ontology/vital#hasCertainty" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasDegree" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasPageRank" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasName" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasOntologyIRI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasProvenance" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasTimestamp" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasUpdateTime" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasVersionIRI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#isActive" : {
        "type" : "boolean"
      },
      "http://vital.ai/ontology/vital-nlp#hasBody" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasDmozPath" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasExtractedText" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasExtractedTitle" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasLang" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasPublicationDate" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-nlp#hasSentimentScore" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-nlp#hasSourceDomain" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasSourceName" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasTitle" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasUrl" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasUrlRoot" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#isSentimentMixed" : {
        "type" : "boolean"
      },
      "http://vital.ai/ontology/vital-social#hasAuthorID" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasAuthorName" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasAuthorScreenName" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasFavoriteCount" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasInReplyToScreenName" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasInReplyToTweetID" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasInReplyToUserID" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasLatitude" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasLongitude" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasOriginalAuthorID" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasOriginalAuthorName" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasOriginalAuthorScreenName" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasTweetID" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#isRetweet" : {
        "type" : "boolean"
      }
    },
    "required" : [ "URI", "type" ],
    "additionalProperties" : false
  }, {
    "id" : "http://vital.ai/ontology/vital-social#TwitterAccount",
    "parent" : "http://vital.ai/ontology/vital-social#SocialMediaAccount",
    "$schema" : "http://json-schema.org/draft-04/schema#",
    "title" : "http://vital.ai/ontology/vital-social#TwitterAccount",
    "description" : "Auto-generated schema for owl class: http://vital.ai/ontology/vital-social#TwitterAccount",
    "type" : "object",
    "properties" : {
      "URI" : {
        "type" : "string"
      },
      "type" : {
        "enum" : [ "http://vital.ai/ontology/vital-social#TwitterAccount" ]
      },
      "types" : {
        "type" : "array",
        "minItems" : 1,
        "items" : {
          "type" : "string"
        },
        "uniqueItems" : true
      },
      "http://vital.ai/ontology/vital#hasCertainty" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasDegree" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasPageRank" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasName" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasOntologyIRI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasProvenance" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasTimestamp" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasUpdateTime" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasVersionIRI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#isActive" : {
        "type" : "boolean"
      },
      "http://vital.ai/ontology/vital-social#hasAccessToken" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasDescription" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasFollowersCount" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasFollowingCount" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasLikesCount" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasOAuthToken" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasOAuthTokenSecret" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasPictureURL" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasScreenName" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasTweetsCount" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasTwitterID" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#isTokenValid" : {
        "type" : "boolean"
      }
    },
    "required" : [ "URI", "type" ],
    "additionalProperties" : false
  }, {
    "id" : "http://vital.ai/ontology/vital-social#YouTubeAccount",
    "parent" : "http://vital.ai/ontology/vital-social#SocialMediaAccount",
    "$schema" : "http://json-schema.org/draft-04/schema#",
    "title" : "http://vital.ai/ontology/vital-social#YouTubeAccount",
    "description" : "Auto-generated schema for owl class: http://vital.ai/ontology/vital-social#YouTubeAccount",
    "type" : "object",
    "properties" : {
      "URI" : {
        "type" : "string"
      },
      "type" : {
        "enum" : [ "http://vital.ai/ontology/vital-social#YouTubeAccount" ]
      },
      "types" : {
        "type" : "array",
        "minItems" : 1,
        "items" : {
          "type" : "string"
        },
        "uniqueItems" : true
      },
      "http://vital.ai/ontology/vital#hasCertainty" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasDegree" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasPageRank" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasName" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasOntologyIRI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasProvenance" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasTimestamp" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasUpdateTime" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasVersionIRI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#isActive" : {
        "type" : "boolean"
      },
      "http://vital.ai/ontology/vital-social#hasAccessToken" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasChannelID" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasCommentCount" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasCountry" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasDescription" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasExpiresIn" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasLikesCount" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasPictureURL" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasPublishedAt" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasRefreshToken" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasSubscriberCount" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasVideoCount" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasViewCount" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#isTokenValid" : {
        "type" : "boolean"
      }
    },
    "required" : [ "URI", "type" ],
    "additionalProperties" : false
  }, {
    "id" : "http://vital.ai/ontology/vital-social#YouTubeComment",
    "parent" : "http://vital.ai/ontology/vital-nlp#Document",
    "$schema" : "http://json-schema.org/draft-04/schema#",
    "title" : "http://vital.ai/ontology/vital-social#YouTubeComment",
    "description" : "Auto-generated schema for owl class: http://vital.ai/ontology/vital-social#YouTubeComment",
    "type" : "object",
    "properties" : {
      "URI" : {
        "type" : "string"
      },
      "type" : {
        "enum" : [ "http://vital.ai/ontology/vital-social#YouTubeComment" ]
      },
      "types" : {
        "type" : "array",
        "minItems" : 1,
        "items" : {
          "type" : "string"
        },
        "uniqueItems" : true
      },
      "http://vital.ai/ontology/vital#hasCertainty" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasDegree" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasPageRank" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasName" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasOntologyIRI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasProvenance" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasTimestamp" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasUpdateTime" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-core#hasVersionIRI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#isActive" : {
        "type" : "boolean"
      },
      "http://vital.ai/ontology/vital-nlp#hasBody" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasDmozPath" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasExtractedText" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasExtractedTitle" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasLang" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasPublicationDate" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-nlp#hasSentimentScore" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-nlp#hasSourceDomain" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasSourceName" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasTitle" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasUrl" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasUrlRoot" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#isSentimentMixed" : {
        "type" : "boolean"
      },
      "http://vital.ai/ontology/vital-social#hasAuthorName" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasChannelID" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasCommentID" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-social#hasLikeCount" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital-social#hasVideoID" : {
        "type" : "string"
      }
    },
    "required" : [ "URI", "type" ],
    "additionalProperties" : false
  } ],
  "properties" : [ {
    "URI" : "http://vital.ai/ontology/vital-social#hasAccessToken",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#SocialMediaAccount" ],
    "shortName" : "accessToken",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasAuthorID",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#Tweet" ],
    "shortName" : "authorID",
    "multipleValues" : false,
    "type" : "LongProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasAuthorName",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#Tweet", "http://vital.ai/ontology/vital-social#YouTubeComment" ],
    "shortName" : "authorName",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasAuthorScreenName",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#Tweet" ],
    "shortName" : "authorScreenName",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasBio",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#InstagramAccount" ],
    "shortName" : "bio",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasCategory",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#FacebookAccount" ],
    "shortName" : "category",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasChannelID",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#YouTubeAccount", "http://vital.ai/ontology/vital-social#YouTubeComment" ],
    "shortName" : "channelID",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasCity",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#SoundCloudAccount" ],
    "shortName" : "city",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasCommentCount",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#YouTubeAccount" ],
    "shortName" : "commentCount",
    "multipleValues" : false,
    "type" : "LongProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasCommentID",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#YouTubeComment" ],
    "shortName" : "commentID",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasCountry",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#SoundCloudAccount", "http://vital.ai/ontology/vital-social#YouTubeAccount" ],
    "shortName" : "country",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasDescription",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#SoundCloudAccount", "http://vital.ai/ontology/vital-social#TwitterAccount", "http://vital.ai/ontology/vital-social#YouTubeAccount" ],
    "shortName" : "description",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasDiscogsName",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#SoundCloudAccount" ],
    "shortName" : "discogsName",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasExpiresIn",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#SoundCloudAccount", "http://vital.ai/ontology/vital-social#YouTubeAccount" ],
    "shortName" : "expiresIn",
    "multipleValues" : false,
    "type" : "IntegerProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasFacebookID",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#FacebookAccount" ],
    "shortName" : "facebookID",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasFavoriteCount",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#SoundCloudAccount", "http://vital.ai/ontology/vital-social#Tweet" ],
    "shortName" : "favoriteCount",
    "multipleValues" : false,
    "type" : "IntegerProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasFollowersCount",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#InstagramAccount", "http://vital.ai/ontology/vital-social#SoundCloudAccount", "http://vital.ai/ontology/vital-social#TwitterAccount" ],
    "shortName" : "followersCount",
    "multipleValues" : false,
    "type" : "IntegerProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasFollowingCount",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#InstagramAccount", "http://vital.ai/ontology/vital-social#SoundCloudAccount", "http://vital.ai/ontology/vital-social#TwitterAccount" ],
    "shortName" : "followingCount",
    "multipleValues" : false,
    "type" : "IntegerProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasInReplyToScreenName",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#Tweet" ],
    "shortName" : "inReplyToScreenName",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasInReplyToTweetID",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#Tweet" ],
    "shortName" : "inReplyToTweetID",
    "multipleValues" : false,
    "type" : "LongProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasInReplyToUserID",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#Tweet" ],
    "shortName" : "inReplyToUserID",
    "multipleValues" : false,
    "type" : "LongProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasInstagramID",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#InstagramAccount" ],
    "shortName" : "instagramID",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasLatitude",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#Tweet" ],
    "shortName" : "latitude",
    "multipleValues" : false,
    "type" : "DoubleProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasLikeCount",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#YouTubeComment" ],
    "shortName" : "likeCount",
    "multipleValues" : false,
    "type" : "IntegerProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasLikesCount",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#FanCountry", "http://vital.ai/ontology/vital-social#SocialMediaAccount" ],
    "shortName" : "likesCount",
    "multipleValues" : false,
    "type" : "IntegerProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasLongitude",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#Tweet" ],
    "shortName" : "longitude",
    "multipleValues" : false,
    "type" : "DoubleProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasMediaCount",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#InstagramAccount" ],
    "shortName" : "mediaCount",
    "multipleValues" : false,
    "type" : "IntegerProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasMyspaceName",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#SoundCloudAccount" ],
    "shortName" : "myspaceName",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasOAuthToken",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#TwitterAccount" ],
    "shortName" : "oAuthToken",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasOAuthTokenSecret",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#TwitterAccount" ],
    "shortName" : "oAuthTokenSecret",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasOriginalAuthorID",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#Tweet" ],
    "shortName" : "originalAuthorID",
    "multipleValues" : false,
    "type" : "LongProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasOriginalAuthorName",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#Tweet" ],
    "shortName" : "originalAuthorName",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasOriginalAuthorScreenName",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#Tweet" ],
    "shortName" : "originalAuthorScreenName",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasPageFansCountry",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#FacebookAccount" ],
    "shortName" : "pageFansCountry",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasPermalink",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#SoundCloudAccount" ],
    "shortName" : "permalink",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasPermalinkURL",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#SoundCloudAccount" ],
    "shortName" : "permalinkURL",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasPictureURL",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#SocialMediaAccount" ],
    "shortName" : "pictureURL",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasPlaylistsCount",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#SoundCloudAccount" ],
    "shortName" : "playlistsCount",
    "multipleValues" : false,
    "type" : "IntegerProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasPublishedAt",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#YouTubeAccount" ],
    "shortName" : "publishedAt",
    "multipleValues" : false,
    "type" : "DateProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasRecipientID",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#DirectMessage" ],
    "shortName" : "recipientID",
    "multipleValues" : false,
    "type" : "LongProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasRecipientName",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#DirectMessage" ],
    "shortName" : "recipientName",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasRecipientScreenName",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#DirectMessage" ],
    "shortName" : "recipientScreenName",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasRefreshToken",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#SoundCloudAccount", "http://vital.ai/ontology/vital-social#YouTubeAccount" ],
    "shortName" : "refreshToken",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasScreenName",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#TwitterAccount" ],
    "shortName" : "screenName",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasSoundCloudID",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#SoundCloudAccount" ],
    "shortName" : "soundCloudID",
    "multipleValues" : false,
    "type" : "LongProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasSoundCloudURI",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#SoundCloudAccount" ],
    "shortName" : "soundCloudURI",
    "multipleValues" : false,
    "type" : "URIProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasSubscriberCount",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#YouTubeAccount" ],
    "shortName" : "subscriberCount",
    "multipleValues" : false,
    "type" : "LongProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasTracksCount",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#SoundCloudAccount" ],
    "shortName" : "tracksCount",
    "multipleValues" : false,
    "type" : "IntegerProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasTweetID",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#Tweet" ],
    "shortName" : "tweetID",
    "multipleValues" : false,
    "type" : "LongProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasTweetsCount",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#TwitterAccount" ],
    "shortName" : "tweetsCount",
    "multipleValues" : false,
    "type" : "IntegerProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasTwitterID",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#TwitterAccount" ],
    "shortName" : "twitterID",
    "multipleValues" : false,
    "type" : "LongProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasUsername",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#FacebookAccount", "http://vital.ai/ontology/vital-social#InstagramAccount", "http://vital.ai/ontology/vital-social#SoundCloudAccount" ],
    "shortName" : "username",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasVideoCount",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#YouTubeAccount" ],
    "shortName" : "videoCount",
    "multipleValues" : false,
    "type" : "LongProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasVideoID",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#YouTubeComment" ],
    "shortName" : "videoID",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasViewCount",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#YouTubeAccount" ],
    "shortName" : "viewCount",
    "multipleValues" : false,
    "type" : "LongProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasWebsite",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#InstagramAccount", "http://vital.ai/ontology/vital-social#SoundCloudAccount" ],
    "shortName" : "website",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#hasWebsiteTitle",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#SoundCloudAccount" ],
    "shortName" : "websiteTitle",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#isRetweet",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#Tweet" ],
    "shortName" : "retweet",
    "multipleValues" : false,
    "type" : "BooleanProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital-social#isTokenValid",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-social#SocialMediaAccount" ],
    "shortName" : "tokenValid",
    "multipleValues" : false,
    "type" : "BooleanProperty"
  } ]
};

 VITAL_JSON_SCHEMAS.push(vital_social_0_2_304_schema);