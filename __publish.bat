E:
cd E:\Documents\GitHub\emptyzone.github.com
attrib -h ".git"
move ".git" "../_backup"
rm -rf *
cd E:\Documents\GitHub\emptyzone.github.com.code
rm -rf "_site"
start __makesite.bat
pause
cd E:\Documents\GitHub\emptyzone.github.com
move "../_backup" ".git"
attrib +h ".git"
echo > .nojekyll
