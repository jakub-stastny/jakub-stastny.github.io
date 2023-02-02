export PROJECT_ROOT=$PWD

load ~/.zsh/environments/basic.zsh

serve() {
  echo "~ Running python3 -m http.server 8001"
  python3 -m http.server 8001
}

# TODO: nohup 2> /dev/null or what.
edit() {
  goneovim -p README.md *.html css/* js/*
}
