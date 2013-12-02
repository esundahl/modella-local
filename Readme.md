
# modella-local

  local storage plugin for modella

## Installation

  Install with [component(1)](http://component.io):

    $ component install esundahl/modella-local

## API

### #save

  Saves the model to indexdb falling back to local storage. Will not attempt to save if model#isValid() returns false. 
  
  Calls cb(err) after save.

### #update

  

### #remove

  Deletes the model using the sync layer and marks it as removed.

  Calls cb(err) after remove.
  
### #find



## License

  MIT
