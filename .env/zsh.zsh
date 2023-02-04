#export PROJECT_ROOT=$PWD

load ~/.zsh/environments/helpers.zsh && save-function-list
load ~/.zsh/environments/basic.zsh

# TODO: nohup 2> /dev/null or what.
edit-project() {
  goneovim -p README.md *.html css/* js/*
}

report-custom-functions
