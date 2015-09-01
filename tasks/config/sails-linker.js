/**
 * Autoinsert script tags (or other filebased tags) in an html file.
 *
 * ---------------------------------------------------------------
 *
 * Automatically inject <script> tags for javascript files and <link> tags
 * for css files.  Also automatically links an output file containing precompiled
 * templates using a <script> tag.
 *
 * For usage docs see:
 * 		https://github.com/Zolmeister/grunt-sails-linker
 *
 */
module.exports = function(grunt) {

	grunt.config.set('sails-linker', {
		devJs: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="%s"></script>',
				appRoot: ''
			},
			files: {
				'index.html': require('../pipeline').jsFilesToInject,
				'app/*.html': require('../pipeline').jsFilesToInject,
				'app/**/*.html': require('../pipeline').jsFilesToInject
			}
		},

		devJsRelative: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="%s"></script>',
				appRoot: '',
				relative: true
			},
			files: {
				'index.html': require('../pipeline').jsFilesToInject,
				'app/*.html': require('../pipeline').jsFilesToInject,
				'app/**/*.html': require('../pipeline').jsFilesToInject
			}
		},

		prodJs: {
      options: {
        startTag: '<!--SCRIPTS-->',
        endTag: '<!--SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: ''
      },
      files: {
        'index.html': ['tmp/public/dist/*.js'],
        'app/*.html': ['tmp/public/dist/*.js'],
        'app/**/*.html': ['tmp/public/dist/*.js']
      }
    },

		prodJsRelative: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="%s"></script>',
				appRoot: '',
				relative: true
			},
			files: {
				'index.html': ['tmp/public/min/production.min.js'],
				'app/*.html': ['tmp/public/min/production.min.js'],
				'app/**/*.html': ['tmp/public/min/production.min.js']
			}
		},

		devStyles: {
			options: {
				startTag: '<!--STYLES-->',
				endTag: '<!--STYLES END-->',
				fileTmpl: '<link rel="stylesheet" href="%s">',
				appRoot: ''
			},

			files: {
				'index.html': require('../pipeline').cssFilesToInject,
				'app/*.html': require('../pipeline').cssFilesToInject,
				'app/**/*.html': require('../pipeline').cssFilesToInject
			}
		},

    prodStyles: {
      options: {
        startTag: '<!--STYLES-->',
        endTag: '<!--STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: ''
      },
      files: {
				'index.html': ['tmp/public/dist/*.css'],
				'app/*.html': ['tmp/public/dist/*.css'],
				'app/**/*.html': ['tmp/public/dist/*.css']
      }
    },

		prodStylesRelative: {
			options: {
				startTag: '<!--STYLES-->',
				endTag: '<!--STYLES END-->',
				fileTmpl: '<link rel="stylesheet" href="%s">',
				appRoot: 'tmp/public',
				relative: true
			},
			files: {
				'*.html': ['tmp/public/min/production.min.css'],
				'**/*.html': ['tmp/public/min/production.min.css']
			}
		},

		// Bring in JST template object
		devTpl: {
			options: {
				startTag: '<!--TEMPLATES-->',
				endTag: '<!--TEMPLATES END-->',
				fileTmpl: '<script type="text/javascript" src="%s"></script>',
				appRoot: 'tmp/public'
			},
			files: {
				'*.html': ['tmp/public/jst.js'],
				'**/*.html': ['tmp/public/jst.js']
			}
		},

		devJsJade: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: 'script(src="%s")',
				appRoot: 'tmp/public'
			},
			files: {
				'views/**/*.jade': require('../pipeline').jsFilesToInject
			}
		},

		devJsRelativeJade: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: 'script(src="%s")',
				appRoot: 'tmp/public',
				relative: true
			},
			files: {
				'**/*.jade': require('../pipeline').jsFilesToInject
			}
		},

		prodJsJade: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: 'script(src="%s")',
				appRoot: 'tmp/public'
			},
			files: {
				'**/*.jade': ['tmp/public/min/production.min.js']
			}
		},

		prodJsRelativeJade: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: 'script(src="%s")',
				appRoot: 'tmp/public',
				relative: true
			},
			files: {
				'app/**/*.jade': ['tmp/public/min/production.min.js']
			}
		},

		devStylesJade: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: 'link(rel="stylesheet", href="%s")',
				appRoot: 'tmp/public'
			},

			files: {
				'**/*.jade': require('../pipeline').cssFilesToInject
			}
		},

		devStylesRelativeJade: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: 'link(rel="stylesheet", href="%s")',
				appRoot: 'tmp/public',
				relative: true
			},

			files: {
				'**/*.jade': require('../pipeline').cssFilesToInject
			}
		},

		prodStylesJade: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: 'link(rel="stylesheet", href="%s")',
				appRoot: 'tmp/public'
			},
			files: {
				'**/*.jade': ['tmp/public/min/production.min.css']
			}
		},

		prodStylesRelativeJade: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: 'link(rel="stylesheet", href="%s")',
				appRoot: 'tmp/public',
				relative: true
			},
			files: {
				'**/*.jade': ['tmp/public/min/production.min.css']
			}
		},

		// Bring in JST template object
		devTplJade: {
			options: {
				startTag: '// TEMPLATES',
				endTag: '// TEMPLATES END',
				fileTmpl: 'script(type="text/javascript", src="%s")',
				appRoot: 'tmp/public'
			},
			files: {
				'**/*.jade': ['tmp/public/jst.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-sails-linker');
};
