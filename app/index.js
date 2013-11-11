'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var GaffaGenerator = module.exports = function GaffaGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(GaffaGenerator, yeoman.generators.Base);

GaffaGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
        name: "name",
        message: "What is the name of your project?"
    },
    {
        name: "description",
        message: "Give me a description on what your app is supposed to do",
        default: "A sample description"
    },
    {
        name: "keywords",
        message: "Give me keywords that correspond to the site. (comma-separated)",
        default: "keyword 1, keyword 2, keyword 3, etc."
    },
    {
        name: "authorName",
        message: "Who is the creator of this site?",
        default: "Firstname Surname (optional)",
    },
    {
        name: "authorURL",
        message: "What is the site where the author can be reached?",
        default: "http://www.yourwebsite.com (optional)"
    },
    {
        name: "authorGitHub",
        default: "yourGitHubusername",
        message: "What is your gitHub account? (optional)"
    },
    {
        name: "authorTwitter",
        default: "yourTwitterUsername",
        message: "What is your Twitter account? (optional)"
    },
    {
        name: "authorCompanyName",
        default: "Company Name",
        message: "What is your company name? (optional)"
    }
/*    
    Havent yet implemented options for css preprocessor.
    Defaulting to stylus because it's ok.
    Happy for others to develop the rawlist and request a pull - SM 11/11/13

    ,{
        type: "rawlist",
        message: "Do you want a css preprocessor?: ",
        name: "preprocessor",
        choices: [ "Stylus", "LESS", "SASS", "Medium", "Small", "Micro" ],
        filter: function( val ) { return val.toLowerCase(); }
  
    }
*/    
    ];

  this.prompt(prompts, function (props) {
    this.name = props.name;
    this.description = props.description;
    this.keywords = props.keywords;
    this.authorName = props.authorName;
    this.authorURL = props.authorURL;
    this.authorGitHub = props.authorGitHub;
    this.authorTwitter = props.authorTwitter;
    this.authorCompanyName = props.authorCompanyName;
 
    cb();
  }.bind(this));
};

GaffaGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/scripts');

  this.copy('_Gruntfile.js', 'Gruntfile.js');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');

  this.template("_index.html", "app/index.html");
  this.template("_app.js", "app/scripts/app.js");
  
  this.copy('_actions.js', 'app/scripts/actions.js');
  this.copy('_behaviours.js', 'app/scripts/behaviours.js');
  this.copy('_views.js', 'app/scripts/views.js');

};

GaffaGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
