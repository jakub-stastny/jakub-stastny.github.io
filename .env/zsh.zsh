#export PROJECT_ROOT=$PWD

load ~/.zsh/environments/helpers.zsh && save-function-list
load ~/.zsh/environments/basic.zsh

# TODO: nohup 2> /dev/null or what.
edit-html() {
  goneovim -u .env/vimrc.vim -p README.md *.html wiki/*.html
}

edit-css() {
  goneovim -u .env/vimrc.vim -p README.md css/*.css
}

edit-js() {
  goneovim -u .env/vimrc.vim -p README.md js/*.js
}

report-custom-functions
