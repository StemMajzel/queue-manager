# define paths
Exec {path => ['/bin/', '/sbin/', '/usr/bin/', '/usr/sbin/']}

# set global packages params
Package {ensure => installed}

# initialize - update apt-get
class initialize {
  exec {'apt_get_upgrade':
    command => 'apt-get update && apt-get --quiet --yes --fix-broken upgrade'
  }
}

# install nodejs
class install_nodejs {
  package {'nodejs':
    name => 'nodejs',
    require => Class['initialize']
  }

  package {'npm':
    name => 'npm',
    require => Package['nodejs']
  }
}

# set symling to project folder
class set_symlink {
  exec {'create_folder':
    command => 'mkdir /home/vagrant/queue-manager',
    require => Class['install_nodejs']
  }

  file {'link':
    path => '/home/vagrant/queue-manager',
    ensure => link,
    force => true,
    target => '/vagrant',
    require => Exec['create_folder']
  }
}

# install node js dependencies
class install_dependencies {
  exec {'install_deps':
    cwd => '/home/vagrant/queue-manager',
    command => 'npm cache clean && npm install --no-bin-links',
    require => Class['set_symlink']
  }
}

include initialize
include install_nodejs
include set_symlink
include install_dependencies
