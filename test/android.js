var AppBundleInfo = require('../index');
var assert = require('assert');
var fs = require('fs');

describe('android',function(){
    it('should load and parse manifest from file',function(done){
        var abi = new AppBundleInfo.Android(__dirname+'/test.apk');

        abi.getManifest(function(err,data){
            if(err)return done(err);

            assert.equal(data.versionCode,1);
            assert.equal(data.versionName,'1.0');
            assert.equal(data.package,'com.octo.android.robodemo.sample');

            done()
        })
    })

    it('should load and parse manifest from stream',function(done){
        var abi = new AppBundleInfo.Android(fs.createReadStream(__dirname+'/test.apk'));

        abi.getManifest(function(err,data){
            if(err)return done(err);

            assert.equal(data.versionCode,1);
            assert.equal(data.versionName,'1.0');
            assert.equal(data.package,'com.octo.android.robodemo.sample');

            assert.equal(abi.getVersionCode(),1);
            assert.equal(abi.getVersionName(),'1.0');
            assert.equal(abi.getIdentifier(),'com.octo.android.robodemo.sample');

            abi.getIconFile(function(err,iconData){
              console.log('IconData:');
              console.log(iconData);
                assert.ifError(err);
                done();
            })
        })
    })

    it('should load and parse manifest from stream and mipmap',function(done){
        var abi = new AppBundleInfo.Android(fs.createReadStream(__dirname+'/test-mipmap.apk'));

        abi.getManifest(function(err,data){
            if(err)return done(err);

            assert.equal(data.versionCode,1);
            assert.equal(data.versionName,'1.0');

            abi.getIconFile(function(err,iconData){
                assert.ifError(err);
                done();
            })
        })
    })

    it('should not crash on bad archive',function(done){
        var abi = new AppBundleInfo.Android(fs.createReadStream(__dirname+'/bad_archive.apk'));

        abi.getManifest(function(err,data){
            assert.equal(err != null, true);
            done();
        })
    })

    it('should finish on invalid file',function(done){
        var abi = new AppBundleInfo.Android(fs.createReadStream(__dirname+'/test.ipa'));

        abi.getManifest(function(err){
            assert.ok(!!err);
            done();
        })
    })
})