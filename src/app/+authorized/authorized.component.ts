import {Component, OnInit} from '@angular/core';
declare var n_fs: any;
declare var n_http: any;

@Component({
  selector: 'authorized',
  templateUrl: './authorized.component.html',
})
export class AuthorizedComponent implements OnInit {
  public fileContent : String;

  ngOnInit(): void {
    if(n_fs){
      this.fileContent = n_fs.readFileSync('package.json');
    }
    this.startDownload();
  }

  startDownload (){
    this.downloadFile("http://livingmacrobiotic.com/wp-content/uploads/2015/08/win.png", 'win.png', this.downloadSucceed)
  }

  downloadFile (url, dest, cb) {
    if(n_http){
      var file = n_fs.createWriteStream(dest);
      return n_http.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
          file.close(cb);  // close() is async, call cb after close completes.
        });
      }).on('error', function(err) { // Handle errors
        n_fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
      });
    }
  }

  downloadSucceed(error){
    if(!error){
      console.log("Download Succeed");
    }else{
      console.error("Download Error", error);
    }
  }

}
