const sources = [
    {
        "context": {
            "name": "sitemap:urls",
            "description": "Set with the `sitemap.urls` config."
        },
        "urls": [],
        "sourceType": "user"
    },
    {
        "context": {
            "name": "nuxt:pages",
            "description": "Generated from your static page files.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:pages'] }`."
            ]
        },
        "urls": [
            {
                "loc": "/",
                "_sitemap": "es",
                "alternatives": [
                    {
                        "hreflang": "es",
                        "href": "/"
                    },
                    {
                        "hreflang": "en",
                        "href": "/en/"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/"
                    }
                ]
            },
            {
                "loc": "/en/",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "es",
                        "href": "/"
                    },
                    {
                        "hreflang": "en",
                        "href": "/en/"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/"
                    }
                ]
            },
            {
                "loc": "/blog/",
                "_sitemap": "es",
                "alternatives": [
                    {
                        "hreflang": "es",
                        "href": "/blog/"
                    },
                    {
                        "hreflang": "en",
                        "href": "/en/blog/"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/blog/"
                    }
                ]
            },
            {
                "loc": "/en/blog/",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "es",
                        "href": "/blog/"
                    },
                    {
                        "hreflang": "en",
                        "href": "/en/blog/"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/blog/"
                    }
                ]
            },
            {
                "loc": "/about/",
                "_sitemap": "es",
                "alternatives": [
                    {
                        "hreflang": "es",
                        "href": "/about/"
                    },
                    {
                        "hreflang": "en",
                        "href": "/en/about/"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/about/"
                    }
                ]
            },
            {
                "loc": "/en/about/",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "es",
                        "href": "/about/"
                    },
                    {
                        "hreflang": "en",
                        "href": "/en/about/"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/about/"
                    }
                ]
            },
            {
                "loc": "/contact/",
                "_sitemap": "es",
                "alternatives": [
                    {
                        "hreflang": "es",
                        "href": "/contact/"
                    },
                    {
                        "hreflang": "en",
                        "href": "/en/contact/"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/contact/"
                    }
                ]
            },
            {
                "loc": "/en/contact/",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "es",
                        "href": "/contact/"
                    },
                    {
                        "hreflang": "en",
                        "href": "/en/contact/"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/contact/"
                    }
                ]
            },
            {
                "loc": "/services/vulkan/",
                "_sitemap": "es",
                "alternatives": [
                    {
                        "hreflang": "es",
                        "href": "/services/vulkan/"
                    },
                    {
                        "hreflang": "en",
                        "href": "/en/services/vulkan/"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/services/vulkan/"
                    }
                ]
            },
            {
                "loc": "/en/services/vulkan/",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "es",
                        "href": "/services/vulkan/"
                    },
                    {
                        "hreflang": "en",
                        "href": "/en/services/vulkan/"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/services/vulkan/"
                    }
                ]
            },
            {
                "loc": "/services/multimam/",
                "_sitemap": "es",
                "alternatives": [
                    {
                        "hreflang": "es",
                        "href": "/services/multimam/"
                    },
                    {
                        "hreflang": "en",
                        "href": "/en/services/multimam/"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/services/multimam/"
                    }
                ]
            },
            {
                "loc": "/en/services/multimam/",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "es",
                        "href": "/services/multimam/"
                    },
                    {
                        "hreflang": "en",
                        "href": "/en/services/multimam/"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/services/multimam/"
                    }
                ]
            },
            {
                "loc": "/services/risk-monitor/",
                "_sitemap": "es",
                "alternatives": [
                    {
                        "hreflang": "es",
                        "href": "/services/risk-monitor/"
                    },
                    {
                        "hreflang": "en",
                        "href": "/en/services/risk-monitor/"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/services/risk-monitor/"
                    }
                ]
            },
            {
                "loc": "/en/services/risk-monitor/",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "es",
                        "href": "/services/risk-monitor/"
                    },
                    {
                        "hreflang": "en",
                        "href": "/en/services/risk-monitor/"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/services/risk-monitor/"
                    }
                ]
            },
            {
                "loc": "/services/communitraders/",
                "_sitemap": "es",
                "alternatives": [
                    {
                        "hreflang": "es",
                        "href": "/services/communitraders/"
                    },
                    {
                        "hreflang": "en",
                        "href": "/en/services/communitraders/"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/services/communitraders/"
                    }
                ]
            },
            {
                "loc": "/en/services/communitraders/",
                "_sitemap": "en",
                "alternatives": [
                    {
                        "hreflang": "es",
                        "href": "/services/communitraders/"
                    },
                    {
                        "hreflang": "en",
                        "href": "/en/services/communitraders/"
                    },
                    {
                        "hreflang": "x-default",
                        "href": "/services/communitraders/"
                    }
                ]
            },
            {
                "loc": "/sitemap.xml",
                "_sitemap": "es"
            }
        ],
        "sourceType": "app"
    },
    {
        "context": {
            "name": "nuxt:route-rules",
            "description": "Generated from your route rules config.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:route-rules'] }`."
            ]
        },
        "urls": [
            "/"
        ],
        "sourceType": "app"
    },
    {
        "context": {
            "name": "nuxt:prerender",
            "description": "Generated at build time when prerendering.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:prerender'] }`."
            ]
        },
        "urls": [
            {
                "loc": "/",
                "_sitemap": "es"
            }
        ],
        "sourceType": "app"
    }
];

export { sources };
//# sourceMappingURL=global-sources.mjs.map
