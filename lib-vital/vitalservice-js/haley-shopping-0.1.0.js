if(typeof(VITAL_JSON_SCHEMAS) == 'undefined') {
 throw ("No VITAL_JSON_SCHEMAS list defined - vital-core domain unavailable");
}

var haley_shopping_0_1_0_schema = {
  "domainURI" : "http://vital.ai/ontology/haley-shopping",
  "name" : "haley-shopping-0.1.0",
  "vitalsignsVersion" : "0.2.304",
  "parents" : [ "http://vital.ai/ontology/vital-nlp", "http://vital.ai/ontology/vital" ],
  "schemas" : [ {
    "id" : "http://vital.ai/ontology/haley-shopping#AmazonActor",
    "parent" : "http://vital.ai/ontology/haley-shopping#AmazonEntity",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/haley-shopping#AmazonArtist",
    "parent" : "http://vital.ai/ontology/haley-shopping#AmazonEntity",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/haley-shopping#AmazonAuthor",
    "parent" : "http://vital.ai/ontology/haley-shopping#AmazonEntity",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/haley-shopping#AmazonBrand",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/haley-shopping#AmazonBrowseNode",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/haley-shopping#AmazonCreator",
    "parent" : "http://vital.ai/ontology/haley-shopping#AmazonEntity",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/haley-shopping#AmazonCustomerReview",
    "parent" : "http://vital.ai/ontology/vital-nlp#Document",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/haley-shopping#AmazonDirector",
    "parent" : "http://vital.ai/ontology/haley-shopping#AmazonEntity",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/haley-shopping#AmazonEditorialReview",
    "parent" : "http://vital.ai/ontology/vital-nlp#Document",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/haley-shopping#AmazonEntity",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/haley-shopping#AmazonItem",
    "parent" : "http://vital.ai/ontology/haley-shopping#ProductItem",
    "properties" : {
      "http://vital.ai/ontology/haley-shopping#hasAsin" : {
        "type" : "string"
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/haley-shopping#AmazonManufacturer",
    "parent" : "http://vital.ai/ontology/haley-shopping#AmazonEntity",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/haley-shopping#AmazonNewRelease",
    "parent" : "http://vital.ai/ontology/haley-shopping#AmazonItem",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/haley-shopping#AmazonOffer",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/haley-shopping#AmazonReviewSummary",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/haley-shopping#AmazonSearchIndex",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/haley-shopping#AmazonShoppingCart",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/haley-shopping#AmazonShoppingCartItem",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/haley-shopping#AmazonTopSeller",
    "parent" : "http://vital.ai/ontology/haley-shopping#AmazonItem",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/haley-shopping#AmazonVariation",
    "parent" : "http://vital.ai/ontology/haley-shopping#ProductVariation",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/haley-shopping#AmazonVariationDimension",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/haley-shopping#ProductItem",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
      "http://vital.ai/ontology/haley-shopping#hasAverageRating" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/haley-shopping#hasDescription" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/haley-shopping#hasLargeImageURL" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/haley-shopping#hasMediumImageURL" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/haley-shopping#hasPriceAmount" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/haley-shopping#hasPriceCurrencyCode" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/haley-shopping#hasPriceFormatted" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/haley-shopping#hasRatingsCount" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/haley-shopping#hasSmallImageURL" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-nlp#hasUrl" : {
        "type" : "string"
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/haley-shopping#ProductVariation",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
    }
  } ],
  "properties" : [ {
    "URI" : "http://vital.ai/ontology/haley-shopping#hasAsin",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley-shopping#AmazonItem" ],
    "shortName" : "asin",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley-shopping#hasAverageRating",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley-shopping#ProductItem" ],
    "shortName" : "averageRating",
    "multipleValues" : false,
    "type" : "DoubleProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley-shopping#hasDescription",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley-shopping#ProductItem" ],
    "shortName" : "description",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley-shopping#hasLargeImageURL",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley-shopping#ProductItem" ],
    "shortName" : "largeImageURL",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley-shopping#hasMediumImageURL",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley-shopping#ProductItem" ],
    "shortName" : "mediumImageURL",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley-shopping#hasPriceAmount",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley-shopping#ProductItem" ],
    "shortName" : "priceAmount",
    "multipleValues" : false,
    "type" : "DoubleProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley-shopping#hasPriceCurrencyCode",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley-shopping#ProductItem" ],
    "shortName" : "priceCurrencyCode",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley-shopping#hasPriceFormatted",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley-shopping#ProductItem" ],
    "shortName" : "priceFormatted",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley-shopping#hasRatingsCount",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley-shopping#ProductItem" ],
    "shortName" : "ratingsCount",
    "multipleValues" : false,
    "type" : "IntegerProperty"
  }, {
    "URI" : "http://vital.ai/ontology/haley-shopping#hasSmallImageURL",
    "domainClassesURIs" : [ "http://vital.ai/ontology/haley-shopping#ProductItem" ],
    "shortName" : "smallImageURL",
    "multipleValues" : false,
    "type" : "StringProperty"
  } ]
};

 VITAL_JSON_SCHEMAS.push(haley_shopping_0_1_0_schema);
 
 if(typeof(module) !== 'undefined') {
	 module.exports = haley_shopping_0_1_0_schema;
}