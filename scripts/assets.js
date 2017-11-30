var fs = require('fs-extra');
var sass = require('node-sass');

module.exports = {
    css: function(path, absolutePath, version) {
        fs.removeSync(path + 'embed/trump-russia-embeds/style.css');

        var css = sass.renderSync({
            file: './src/embed/sass/style.scss'
        }).css.toString('utf8');

        fs.mkdirsSync(path + 'embed/trump-russia-embeds/v' + version);
        fs.writeFileSync(path + 'embed/trump-russia-embeds/v' + version + '/style.css', css.replace(/@@assetPath@@/g, absolutePath).replace(/@@version@@/g, 'v' + version));
        console.log('updated css');
    },

    html: function(path, absolutePath, version) {
        fs.mkdirsSync(path + 'tools/trump-russia-embeds');
        fs.writeFileSync(path + 'tools/trump-russia-embeds/index.html',
            fs.readFileSync('./src/tool/index.html', 'utf8').replace(/@@assetPath@@/g, absolutePath).replace(/@@version@@/g, 'v' + version)
        );

        fs.mkdirsSync(path + 'embed/trump-russia-embeds/v' + version)
        fs.writeFileSync(path + 'embed/trump-russia-embeds/v' + version + '/index.html',
            fs.readFileSync('./src/embed/index.html', 'utf8').replace(/@@assetPath@@/g, absolutePath).replace(/@@version@@/g, 'v' + version)
        );

        console.log('updated html!');
    }
} 