var fs = require('fs-extra');
var sass = require('node-sass');

module.exports = {
    css: function(path, absolutePath, version) {
        fs.removeSync(path + 'embed/nfl-graphics/style.css');

        var css = sass.renderSync({
            file: './src/embed/sass/style.scss'
        }).css.toString('utf8');

        fs.mkdirsSync(path + 'embed/nfl-graphics/v' + version);
        fs.writeFileSync(path + 'embed/nfl-graphics/v' + version + '/style.css', css.replace(/@@assetPath@@/g, absolutePath).replace(/@@version@@/g, 'v' + version));
        console.log('updated css');
    },

    html: function(path, absolutePath, version) {
        fs.mkdirsSync(path + 'tools/nfl-graphics');
        fs.writeFileSync(path + 'tools/nfl-graphics/index.html',
            fs.readFileSync('./src/tool/index.html', 'utf8').replace(/@@assetPath@@/g, absolutePath).replace(/@@version@@/g, 'v' + version)
        );

        fs.mkdirsSync(path + 'embed/nfl-graphics/v' + version)
        fs.writeFileSync(path + 'embed/nfl-graphics/v' + version + '/player.html',
            fs.readFileSync('./src/embed/player.html', 'utf8').replace(/@@assetPath@@/g, absolutePath).replace(/@@version@@/g, 'v' + version)
        );

        fs.writeFileSync(path + 'embed/nfl-graphics/v' + version + '/head-to-head.html',
            fs.readFileSync('./src/embed/head-to-head.html', 'utf8').replace(/@@assetPath@@/g, absolutePath).replace(/@@version@@/g, 'v' + version)
        );

        console.log('updated html!');
    }
} 