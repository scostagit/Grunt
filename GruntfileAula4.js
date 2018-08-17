module.exports = function(grunt) {

   grunt.initConfig({
      /* Copia os arquivos para o diretório 'dist' */
      copy: {
         public: {
           expand: true,
           cwd: 'public',
           src: '**',
           dest: 'dist'
         }
     },

     clean: {
          dist: {
              src: 'dist'
          }
     },

     useminPrepare: {
       html: 'dist/**/*.html'
     },

     usemin: {
       html: 'dist/**/*.html'
     },
     imagemin: {
      public: {
        expand: true,
        cwd: 'dist/img',
        src: '**/*.{png,jpg,gif}', //A propriedade src indica que queremos todos os arquivos png, jpg e gif que estiverem em qualquer subpasta dentro de dist/img.
        dest: 'dist/img'
      },
      

      rev: {
        options: {
          encoding: 'utf8', //o encoding do arquivo
          algorithm: 'md5', //o algoritmo utilizado e o tamanho do prefixo gerado
          length: 8 //size
        },
  
        imagens: {
          src: ['dist/img/**/*.{png,jpg,gif}']
        },
        minificados: {
          src: ['dist/js/**/*.min.js', 'dist/css/**/*.min.css']
        }
      }   



   }
  });

  //registrando task para minificação

  grunt.registerTask('dist', ['clean', 'copy']);

  grunt.registerTask('minifica', ['useminPrepare', 'concat', 'uglify', 'cssmin', 'rev:imagens','rev:minificados', 'usemin', 'imagemin']);

  // registrando tasks
  grunt.registerTask('default', ['dist', 'minifica']);

  // carregando tasks
  grunt.loadNpmTasks('grunt-contrib-copy');  //plugin copy dist
  grunt.loadNpmTasks('grunt-contrib-clean'); //plugin to clear folder dist
  grunt.loadNpmTasks('grunt-contrib-concat'); //plugin to minify javascrit
  grunt.loadNpmTasks('grunt-contrib-uglify'); //plugin to minify 
  grunt.loadNpmTasks('grunt-contrib-cssmin');//plugin to minify css
  grunt.loadNpmTasks('grunt-usemin'); //copy filest to correte folder
  grunt.loadNpmTasks('grunt-contrib-imagemin'); //plugin imagem

  /**
   * Plugin to update the files in cache. When we change ours imagens, a new hash code with 8 caracteres
   * will be created. When it happened. This plugin will updated the cache.
   * ex:<img src="2babcead.logo.png"> version 1
   *    <img src="2bffemnp.logo.png"> version 2
   */
  grunt.loadNpmTasks('grunt-rev');
}