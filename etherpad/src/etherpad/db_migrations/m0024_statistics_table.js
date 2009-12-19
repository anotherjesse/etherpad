/**
 * Copyright 2009 Google Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import("etherpad.utils.isPrivateNetworkEdition");
import("sqlbase.sqlobj");
import("sqlbase.sqlcommon");
import("fastJSON");

function run() {
  if (isPrivateNetworkEdition()) {
    return;
  }

  sqlobj.createTable('statistics', {
    id: sqlcommon.autoIncrementClause(),
    name: 'text NOT NULL',
    timestamp: 'integer NOT NULL',
    value: 'TEXT NOT NULL'
  });
  
  var oldStats = sqlobj.selectMulti('usage_stats', {});
  oldStats.forEach(function(stat) {
    sqlobj.insert('statistics', {
      timestamp: stat.timestamp,
      name: stat.name,
      value: fastJSON.stringify({value: stat.value})
    });
  });
}
