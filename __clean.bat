E:
cd E:\Documents\GitHub\emptyzone.github.com
attrib -h ".git"
move ".git" "../_backup"
rm -rf *
move "../_backup" ".git"
attrib +h ".git"
echo > .nojekyll
cd E:\Documents\GitHub\emptyzone.github.com.code
rm -rf "_site"