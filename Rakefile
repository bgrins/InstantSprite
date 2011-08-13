require 'rubygems'

HEADER = /((^\s*\/\/.*\n)+)/  
SCRIPTS = /<script class='dev' src='(.*)'><\/script>/
SCRIPTS2 = /(<script class='dev'.*><\/script>\s)/
REPLACE_LIVE = /<!--livescript-->/
APP_PATH = "site-build/index.html"
FRAMEWORK_PATH = "site-build/scripts/"
OUTPUT_PATH = FRAMEWORK_PATH + 'instantsprite-min.js'
FRAMEWORK_OUTPUT = "instantsprite.min.js"

desc "rebuild the img files for distribution"
task :build do
  begin
    require 'closure-compiler'
  rescue LoadError
    puts "closure-compiler not found.\nInstall it by running 'gem install closure-compiler"
    exit
  end
  
  system("jekyll")
  
  app = File.read APP_PATH
  FRAMEWORK_FILES = app.scan(SCRIPTS).collect { |x| x[0].split('/').last }
  
  File.open(OUTPUT_PATH, 'w+')
  FRAMEWORK_FILES.each do |f|
    filename = FRAMEWORK_PATH + f
    source = File.read filename
    header = "" #source.match(HEADER).to_a[1].to_s.squeeze(' ')
    
    File.open(OUTPUT_PATH, 'a+') do |file|
      file.write header + Closure::Compiler.new.compress(source)
    end
  end
  
  hash = File.read(OUTPUT_PATH).hash.to_s
  NEW_SCRIPT = "<script type='text/javascript' src='scripts/instantsprite-min.js?v="+hash+"'></script>"	
  
 
  newscript = app.sub(REPLACE_LIVE, NEW_SCRIPT).gsub(SCRIPTS2, '')
  File.open(APP_PATH, 'w+') {|f| f.write(newscript) }
  
end
