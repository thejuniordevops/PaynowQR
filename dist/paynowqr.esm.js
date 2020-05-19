import dayjs from 'dayjs';
import easyqrcodejsNodejs from 'easyqrcodejs-nodejs';

class PaynowQRBase{
  constructor(opts){
    Object.defineProperty(this, 'qrstring',{
      value : this.generate(opts)
    });

    Object.defineProperty(this, 'payNowLogo', {
        value: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAADmCAYAAADBavm7AAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAQABJREFUeAHtvQmcXcV951t1zrn39r63lkZoQRJCEjsYBBhbGK/YTpzEkHnJOBPHCbzYgcSeGTvJm/eh+bwktjN+cYLHyQeSjDOfSSZ5kHgSG4M3jMDGmEVsQmKThCREa+lNvfe995xT7/s/597u2913a6lbC6qSbp+t6l91fqf+9f9X1b/+pZQNFgGLgEXAImARsAhYBCwCFgGLgEXAImARsAhYBCwCFgGLgEXAImARsAhYBCwCFgGLgEXAImARsAhYBCwCFgGLgEXAImARsAhYBCwCFgGLgEXAImARsAhYBCwCFgGLgEXAImARsAhYBCwCFgGLgEXAImARsAhYBCwCFgGLgEXAImARsAhYBCwCFgGLgEXAImARsAhYBCwCFgGLgEXAImARsAhYBCwCFgGLgEXAImARsAhYBCwCFgGLgEXAImARsAhYBCwCFgGLgEXAImARsAhYBCwCFgGLgEXAImARsAhYBCwCFgGLgEXAImARsAhYBCwCFgGLgEXAImARsAhYBCwCFgGLgEXAImARsAhYBCwCFgGLgEXAImARsAhYBCwCFgGLgEXAImARsAhYBCwCFgGLgEXAImARsAhYBCwCFgGLgEXAImARsAhYBCwCFgGLgEXAImARsAhYBCwCpzsC+mQX8D51szu2enNifEx5C513ozNqJtwGk67rDwZ2twfdqjsgD7PQ+Qg9aDubNitvf99ooi5sKInjOGVa1dGQvXnnnVmtdNmyCDZqxTXJ3vSwW02ZG5163nfMHGpVfvfO7kw1aWbHMcrouzbfleg8qpKzn5W6Fpz7EkE4fLA5DQ5hqXj2/vEjULJCHT/J0iml4vUsWd/h+M4lSoUrSsc8vieO1oFW4YjjekeyyhxO68nDY0caJha68khlvrf195uy2tkUaOd8bRwYSdqAmUErx/BvMutk94a1ky9+7uBXJ2bGmL4SRm9Zkul0Q+dqrXVHGMylNx07PhP6tDvjvmteHepNvjjf9ySx/svO7vpsOLmRcl6klLQHlfM14GyMOXzMTT7e3ds9Ortc9vrEEVhwqVWuSCIpnWH/EqPC/4d4V5WLezzPwlBlkEqHQhO8pIx5IaEST7Q3+zvv7ry95/bdd8uzshKr2jzvUnclWl29zgnV7+pQfUzpMFWccGhCrQZd5Xzbm6z5E+i/zq94VKWccNJf5SQSn4Xmu4jkVCqPUYGhZe1Vgf7Hc+ozX1Rj6kilNIXP71LdbttEeqWTdH9LK/ObfJeKAJEf7ZIZhTEfqlNjL0DPMmYhqAt0XvHjL1A+EZlYfY0k5YIzpWRgtEnCCKvQrT5Mjf2Cq527tas+4x1r2fJXzX/QIlLpRN9HpGVHY7pRhe4VSjvvQUrDlMV5jbtU9LDZUc6WMNTvvEfdU64hDEMncUSH5gnE0SiNSBVF1URyWjztXDeZ0u8iQTWJ8nS1auuvC1y1CSrXa+1Q1uLvkU8gR2IAsTrkKfPoe1au6y98Zs8XDoETrqgLV5SFpqTdUJk1VLbP+EH4J35CfXB5o2oTxjqRnO5XtziOY5phyE2QaiePSuQc5OYyKv+70w37WkpFFjW08djKnlAFD2rHvAILVCSco+Uhkc8JjbnsG6o7VYr+7Pvkp5vD+jZe5h0mNBso4+woc64BTso0jmayI+PqH165/bbsnEj2xoIg8DZmzBgfGKcGZrwSde8/p2syP/e1hj/s4MkJMOdm13czSxAv6x0Ni1ZgTGqySKI6Y/S60PFWl/tqh9ShwDXem8R5hHST5eJOPzMIWUaftFo/3jQ5n367R1/xXFerd9KnpYxVhdDR7mHjqkcakqmDVaWwkY4Lgbc9Y0aoaJWkEl5sAvV5N6k+9rcdn284HrRE2vY1T9Y7YWoD7LbJVCFlJB8qvYyqLFde8E6OJRsFkZrhseHDbqC+hyq7uxp1VhifxqfWMe76dMK9CBrl1GUpjpRHN7eoOlfrDaS9tAqpn0unM2Ho7/FC97HberrHo5v2z6IgcHYwZgydS41cHRj1yUzoXXuPujUxX0RvQY1N65rm0HE3o2iuDlVl9U/ygBOFeToQS5d/qfULTeXyHVDtWaPSe+nxPQBjIjVL8nEhGbqxZrln1FYGgdoLHxQ7v1/d7Lj+SJfSUb+0tlic2fcoBd1Rp5dy/aw5ObF39nN7vbAInE2MST1USSr7BRkTfiJoXHLefKHcrOoTCTWxksp5JYMlFZTYaeoioYicIt3aOke/Y/rJ3DMknplI6b4gND+BnXe5VYwkI8mdIAzb6CtuGUvoDSLZ51KevrN/6aoa7blM8ygkOKhUF5CWwR7Gih/9tSNfGasuiY11vAicVYwpDEKVbYKprs2mgo92r+6uqRa4WP1rqQmVPo+Kf2E1gyWFtKn+CDS9XIXOZTBfOdyNzL362tkRauc7NCRj1ai0sL7jOs5y1zHv/rvVd5UcBLqZuWRv0lvK1Ov1DLAuKyxjmXNUA6dfufoJ31/6fJl49tECIVCugixQFqcdGQe9r9MJ3OvahtNVS03m/JAsNS3KcS7EoKAT5pzXi5FY/rcEjtrUtixdVt0UqTniDg6iKf80dIIXHElaOTiBCqGrLzPD2c5S0a9XyzxPq5Xw8Tv51VbzHuQ+ybTPqwxzP/TZY589Voq2vb9wCJwRjEnFEC4o+ss9qxoRkXxUslqmCS7g/Oq71e0lpcssoh6q6Aok7nXVDpYUppd8ua5xjVrrZPSlhc+KnBvVu2Q8G068rIz7Y/qz6aqkplJi6HD+hFN8kClScRsamkLX2cx7nFslzRBJP8jv8d7BxM+KlNXeWgQETnfGxMBEZfkN8+uf/YNVB6hso1RGH2w4VBeIKHOLS5kl2Oq0NFWjzunajvGUo9zVdN82zSOrGQWirNij6nNJX3H0VKRm4LkDys8+g13fgSqZSKZvuoJQ31BskAmLJTfw9DkgdYNjdGdVDQz4M6W61wsTD1MmwdmGk4BAxaH1k1CGclkESKlDVOTHqUhvwUwzGhKmEcVYtBVVbz3HtYywLOEokqlskDhIzUbsQzdkEnollVkqPreLByqkTmaHOrWrr6CrWFcyYvHkU3cpGF1NpwmG2LiyId2KMVvv1MO5J2ZN3xvjh9vWvYxd35MUbxVRKhmaMyFp6sjnwkatryb+9wvIatV5tMbJNq1hLvIS3terPN2jQwo8ANGfhK1tTyqrxBbAubinpzVjUsGYOtCvO576+u1Hv/h4MSi61c3J1tb15zPZ/xs8/xWYuCrmFCZhHq9Nh/6F96u7niRtudUZnuPWLUOnuxIGkTnJ4wrSIGBkX8dhzViNXlWBMdUt6v7wy87n30yE+ttkeh3MtIZGpGzezNfKNNAqTNGvv3vd7Y/esftraUkgjUvT6FCzTumL6LueGzCBUynA5KyIcV5Puv6Dt+6+PXOHuqNSEvt8gRCYIYEWiOZJJdOt7s8MDiZfMWrib2jZ/xl1c6RatQ+b1Gbsa9f3dpaVRNFkPObd58OUGyPeOqE3NAlPu13kvenWynOpSM0rx5Mq2Ak/PgFTVlz6IQ0O/xv5XaAHG9bki7pc9bheKrXEdfRm13FL2vfm44Mh0tKhq+A/MZ6tfYnr8i1CPqE9LggCZzxjCgpIg2CgZmSfUc43MVB7BulZERyRXqiUDUxfrEylSjMmS9WcMEgvQWJdReVE2p1YIF8WpZh26F15SWdX2dFZyQmjhlC7tfsD7f4bHHekUu7yXsSp5c9m35h3go2o+zpobmtQbuISo50tQRUWS4j2LEy813M1I7HdVomtBPwCP69cgxc4w0UiZ1RP1ySrBPeExnmWwYqKkiVXDuYW3ZaxMVXSRG8XRgVJ13QxRcJIqq5qeqHcO0YNQhg00yBcrE1wTo6Ryibp7N004Sn/JZZ1/EgkWbnI8TPjojl0srrm8mRjulUsfSZC3YlJhDQuKytZLMHUtG/OiG+CF2s8tatyfjbGQiPwdmFMdae600z4aRYim4MMEo0xV1kRKwaLpA7WM7LTVSwyqqNe2bC80dGyNMqsRIqUD0bLqKVYxZRvGBhBchy9DEuay+5X3RVNA0VqDoQTPZT3h5S3F+YqW46I+U3YCHNtrk84Gwa7Nqc8T63jfbZWIy1Rm30014MI1p/8xuEvlhugKlsO+/D4Eahce4+f9klNKZXVdQLfxYMB0yDYmJ54kCVewzpoQ/27mMrextKqkkRFkrEUrJ9KvZ3e2LEKzOOEoWlDAl4qRvEliU4/gOJb416gX0BNf1jymn5U4gzmxxKoi8bkypHxkU7SbKbBYu629DsIpUhaKj1MvOdoPp4uQd3eXmQE3jaMKdUtaWrQOMMkk59Vj5xSYcvUVMZJPHcJdfxiV7ll1VioZJm22YsM/lfl6DfKyTQyxDQwbGGA9+KM45xbzTe+U92XTYfJA2jpP2Kq53AFxof9sJ81Ybs24Zakm2SaRwzWK8p8WQXq8w4HMYr/4e/2/pF4XLDhFCDwtmFMMZkzQZDCDUAnEpO5xjL8lgNaYhAPS7ZUNKVQiL8wz1stx1hHySoSHa4qNxmfkzIT9Mn20Co8Q5odEd1CgnPPGZQJlyEBZb6xHB9HKaUBGR5Ww1njPYVkfphGoOwLSvmh3+TohCyE/gXjRINXc0sx847QHGWx9nN1KrmNcxtOEQJvG8bsYTogTHlt9C0xNKjOBhTMpSKO+6FzdDb+wuihU9/IbOcGJHAXauDsKAXXCEBHj9Ot3Y8qvR8PBC9DuNy8qKQVKx2xub36nq7u2gJiJU/pRwde1j8cBuEzDOAMV7KhpQxuYPw1Wrsfx5igCvteXlKrw4nQefRTfd09JQtiHyw6Am8LxqRy6wua6hsZ3r8CZW0Lc5NVAmcwYAiP1fhukUW/Oz0vCJj3M5tcHAeRRzma0v2kXxnuPtRcexRvCa8g4YbKqZtQYyzH1KJqrs1mMheUI55/JlLzotHUIK49nuT8BRqgcq1FlEyYk7KziqayGkucCUT3DsfVP8jnaY+nBoEznjFlnu7LuJL0vPormcf8OBW2Kv81VELs+9whrFt2j9X0z5Zu2MauwbjdWatCc0l5aSkcpjKh8g+6rvua2kcfLQxE2rxY8ZPSeYVfukygq3ZO9ihrtcKsczDQ/g/Qwcsyf8X8Z0Zg4Ys+yK3vtfe/dnjmI3t1shE4rU3y4lbe1NNHWv319v8yEFCDCwHycdjm6Mk6ZRIXIw8+gbr2br+8ZJtKLuIKFe8Yo6OvNB0ZnsGYMDv5jDcqN4TJndXwwlS62SdEFIE9AbF92bHRPZju4hBP9TP69BJx3z87fuE1jQgzMRiTa3NZd1d3XXcV7jooW3jPxK1Hx732h52E+jD5Xx1J30LCx3FOOSboR7/EPMkPMAUsP91zHPRtkvkhcFozJjUeo22zGdv1/9sPfXHpOIMxsXV1GYZtRh1dAevM611QA7EDVW/hsPn529S9s729ObW+s9R1nctDFmCWm5CHKeT/CKrs7t8b+wuxzNH36C8MTii9y1GhOHgu23/kHVOUY1VbOnshcZ+q5vMdUl1Bk589oBPBg2gJm0mDCd7xB/JnsQCLBHT4Q10z0acGjp+WTbkwCJzuqizlE7tPtQH+uMI4+vLCHwIHEzO1Gl1ynkwp84B6EFXw2aTvzxnkqF86Gi3xwj/QVTBOBaQZ1dVhP33F3bmIJjlYmzaBvx/VEOYsDXFO0qUoPwNWClWct6kiiNSsn+g9qrP6hzQwYsdaRariUUgpL4hLyvBFfCD8sJy3+OIU7N3FQKB0rVmM3E4TmlRGJIQ6DNM8ueSDl82wA6XS46gqaGEN5MUUd2klxhTJi1KMhbjemX+9/awPdRz/MGO1O5FE+duljuJRoRn+OP8vO++qxtggoiNScywI9jPQ9QA3RDIfZ9CBp9w3HeN/RzUtOXicRGyyBUbgrGNMkRCIiLEgDHaEZvLpW+6/ZXZ/yqnxG5ax3OydYF0JH0iZCeLu7+tL7S34NmE609CHocHL3MP7QOkgUpMh3QaYewNuRNaUjjnziUjNJeN1A8yHPIHEfL6cZJ6ZcvpKsOAqzfzr7nTgPnHH7jvmzOdOx7ZnJxOBShXvZJblZOUl9qwHGJJ9+I6BP50rIbpUMqN9jMsNUxiVxB3DUsr0Y0f7AowidKPAualJ9Y+HfnYPA1L7qmCaBCPEy33fXxvt+JUnVOG4n9HgtKtf4yM+hGSuzmnXTJrAoI+GrvrJfxz54mszH9mrU4nA2caYDJhSEbV5KKxNigo4I4ga2zox0eG6mlUYqm3Gw+IXwph9OqFlBLYwmGUD7ZPa0wfoB7/GusbCZ8XO4Q/TjpeGy/ua15b1O1uYWBqA4VTvIC/1OCOqT1ez3K0wPeJykpHtV3CR+UjhfXt+6hGoWGNOfREXqgSiwaoh1MZHEknnf3zuYHexsUcGUnUnlj5XELesbWxcKp1BGr41Ntnw6uxSslbKzwbmCLYOr/LzYfSSAeZ2kKwwproqqEmsKBlx7oNouVvGmNeZ0cHDg6nWaZdQkkYKtyHq8d/p+6Ptc0nbO6cSgbOCMaUvRSUchkEeTWj/65859EfS95sTOvGJA/euZgoCVyXs6lE+hPgM6lMm3N62rm10dtQ7kWYmTLNKI3iVPtxgZXVWJxztdTlZf4P4fp1Nr9S1SM0wkR7QKvgZDL5nHlKTuVvzGiqwbMcgjZYNpxECb3vGhLsChjj6kJTfhZO+9NsDX36yGP7CDJlM0xLtOtehVy6pZO0DDVnmdZRZzmdu3X7rVP8yT1saAzWsJnQQHsCo/jC//KOix0hqqrATQldf37a56tFZiImD6HTW+KyfNLtpDaphMrKTdaNmZ39f4vmiBbI3TykC85r/O6UlnXfmjHMqPc7vDQZnvheEqf/22f7ufb+nvliU0ntxtpd2Q5Z4uZfAmA30vYrGm7qJVUNW+Rms183X2v5w493qD6Ye5U+Y23QzoW5yTYjkLN8GCmPiB6iN/uilrj+5BBrDeTqVjpvUJnPYeS7DeLMYOuCrR4t9bLlkGCopGYEdxjA+ROqWi2ufnQIE3m6MSb9Jtq8zMILYr+gXYJ9/OtdTj/z8wJ+MlMFXH+toqakLHZwgqzXRfH3Zeg0lFlMyT3kBpgpfhQfEcmiOSBRmxFOBbKbbJbs/VxrlhVlEf+5ibzAxs9vDeaVSlHkl++hMRuB0Z0xhNBgKNxdKl2Os6Bsg6TKorAep3dsZSHn6aG1ie3fPHxdZOTLzkyExtJ4YqzdJbzUMtwR1cGaEolcsOdGqHWZrr2SvE3Ns/LcoqdzNSJ01isEnfeXfqe5/Uap7QTwxlMvTPjs9ETitGZOqnEZkPINf2TvvOPonjDrOMwxWHd+pS9XAYGYz84n1vpnTZaya0IlFROlWpgmzw83jnWxC26t2nxg9m/pMRaB8x+dMfav5lVuLbWxogtVI20sq9M3mR/l4YmP3S4N0TjZ0rj2e5DbN2wOBs54xI0YcU/X0786HIapcy7l4H58Pwq4Qos6qyx9cdzdrQm04GxE46xlTNtqpSbhsMKRkM9oqjAoWu5qwUlSzDbtR5/X0H16/2LlZ+qcnAmc9YzatGGJiP3FOiDlcdYM+i/shZeiWHFgKplcx93EZEl2ubTjLEDirGVOYIDlUU5dlXxJUR3GIfFp8fuZesV1gobbnXiJuU06LQtlCnFQEzmrGvF/dxz6ZaikGslcxHlq1GdzifyHGh03YwOLlTXXRRkaLn6PN4fRC4KxmzDG1KxEm2UjWODjDopd5moRYnTU1zMueFyp3M/OsZ/V3Ok0+y0ktxln7waWyDy3JNGOcg68ds+ykol5VZuLQyGnhA21qayu96VFVpGykMw6B09rAYJHRdHRWdbIa4x30LSuOxiJOZd3YJEdxDo3XgrkmeFWUV8QyUyAaiyHVUL5PyyYKqLNI8/Wh6y8nftW2s1WUw0Y5zRE4axmzSQ0llE6twAj9UgZb2Pa8/MAPT8Wr3k56f3eHrrd3vsDBZDBa4Lmhcx7+hv49voJuYDlYyeqRY/xUwvHOyarsOiT86/yqsRUsSdM+OHMQmG/9OnPerExJRY3VHZkWlnNczOqtjiqEn/DJOIboL2Y8/5urjuw+LhvWQVawBM1dB4wbbKQxuB5G9yBcLsjGQJQvuKyzUz2Kid6cdZ/lEttnZy4CZyVj8rnEE96S0PG20IdrrcAcorOy9pJF0co8u+rIVZO3qK+UFnVl6gL5hF81nz2WUvWvsEh0gLUnS3ChWTIFqq74tO3QofuOTDAJg1rGLAnW2+zBWTn4s0qcQxvNNIleB8PJ5j4VPqsOMJM75Pjhz9hE9riYUjKAwaPF02w8dABnIoeqGQimZEmakXOVl9xMOSFhw9mAwFnHmFK5+xpGm5jA3wifrKzkqUCYid8EKuU+HfhvnmilWKGuyfgq6GFb+pfp1+ILqBKvsYGeCZe4YXDVQ+preKa34WxA4KxjzPvV/U7SqWkOXX0+ErOpkrSEbVBjXbY+0I8f6Wg44ZHRXWqX0emwHzcD22HMwcqMKVt6mXYk55VvtU10ng2V0r7jPPf7eDsAdnDFE8naifpzA6MvxL8GFjYV3spoHwY+nHX08937Tnzhsoysdo/9+rEWr+sF7Slh+M68Ji2yU1rK6IfuHJs8UEDDpuvarKpz+j76g67P/cxjfDfjhD4bZ09mw2QmGzw1GaSTSVwqVHgZ+/hMQeCkDv40OvVmMMwy7mHw0EbfqWLAeYcK2eTLmb3pT8WUJSLompEU22GqNbjGuahSlw1GoabrYQqwM6HMnD1OSuRRxe3VvnYyh3CU8BJ+2C9IsAYTZosWYtaSOsF5rcd2RmQvP4ohazQ3wLB/DLdOwrKBFzrH6Oy+yYbYvUnHvNrqBoNsOdZGgxOnqFwK2SspzeqayjFtjJOOwEllzKB2LHCH3R62Ev8J9efc8m8btf6juIjEbs5fkP0aheKfazxUhtkMEugQfpj7Ybwoo6JlYX6ELuDeIMx+7+LB2kNF4xzHzU2bcQV0NJseVc5uVNk03rq8Ji+jEgxDCVuJpBQVV/zd5X80IjK10ipthYzjwoBdxFqfkIbL6Gx7MggmAxeEjSutWNoY3Nqyea6jjkFxxjuiJsDTep/jejtxxmWQ4sfxFjbJYiJwUhnz1/fdmf7K0q/8NDE+9Gn2dlxV7sWwETVZN5hI+P6BvsEnF0RaiQTsPqaGGxonHwoTNa8njWEzn5mVtrBMjNjCmD79wNrdNxRsgVAYZz7nj6hur+6C3mYv3b9+skG91w+cmzzH1ApDSgjEw1Eu4E2B0uLoRG7Jaa6Yke8/bnGfOU6VkpEpSS1qbC3FTdEjhVPNeOCMjBrnCZ58P+3ow+wkOsKocpQRGjybHoUDo2YSh1+l3z9XFHs4BQhM14STmLlM8GNEU7ZRWJ6bXpRdraRftsDF09CU1SRSjhKkN6vlajlzGodEosgUSVSpS0Que1tGgl9c+p/rgub0OtjmvQltfiHrOxdiAVQHqyQC2UEE/pBjFMgplpTyeWLJKZkLU8oxJzF5Ep9Hz6J48ecUnmZ9acCmuwPw4lP4qXyg13e+O3RsDw3cjPc6Vc6NKLkN5RA4JYxZrkBvt2f3be5Otk4MLmtxslelXPMJP1Dvpj2o4z0T8q7CgLMZM2YsaQn4PDCjxOG/MJskmT4XZo6ec5//+ecSQc4RnHRj9WSgnL3Dvv7b7Jo1/+227bctVH89Kov9szgIlJVai5Pl2UEV3tBPrPhsjU73bmQrr19JuuHHUBvPQY2syY8Ex8eY2QpRkTvyy8crfCbnwqSigeYZUaQt0lHuRkGeS1rprfKI5WNqVaNjrhnYv/+feLRgfeU4N/t3MRCwjLkIqIrq+uS6OxprvezltV7wq/QXf5GR5Rb6hGivhBxTCWMVWwUaMVYUrzhzxkwbUZoqvXCgqLq5ZJFqHKu+5ABBjxGfWicpKrkNZwACljEX+CNJ//mpC36ntdY4N6BJfhoevSoIVJ2IrygrGEjUU3GFJ7vziZqKXJt6LHEkojBsmOtZC6MWBrkWRhQ6ch4xZEw9ihbdy2XHjYApl37XCZ/fe2RbtMOZlBFfR6kg63Jcn7HqbQTbafXnNHKncVrhclyFMVT4xvN72uo89T7PDT7PSOmVqJS1MI6wURQiKRZJNukDxgwo3JVXS2O2zGc/k2FjXssxI1GE12O6cCX/p3g/Si4TLpKFM4Kh77ZRz/mr3x35h9571K2JJa3eObXZxDV1OrVZDw80XN+wZfAHYz+1fc887KfB0TLmAn0EkUJdMKWb1B/EGuC3WX55BaSTIvRiYRb/zUs3OcbMGDOfSMjoGfGF2aIBH5GIERNzQ0LB+Yz7EemYThRNohKXfxm8IOwYD9Vf7z5a91Sn6lTntXZ1JRz3EzVa/34yDD9KOTd6KtF7xZL3HNh2bJsdpRUAT4NgGXMBPoIIvsSG8xpqE+71APqfuMQrQjzqKuTzkk0YLmIoYTD+5zqcEeP6U3OYwqHaJ+4oGxKJccAxkonXBDGGQBU1cm8MOpOiDsPcuKBFKZZkEaWINGdatgnsgf3vr/Mm/+W3Rv909DOdW+vqdf0WTCxud7XewJKzRsq7BI26PRX4ez56wSeOPHDogYWemqLoNswXAdvHnC9iReLL6GuLN3Exk/6fcBx1eTaEKYULCXKIFU44JzoXvuMuzCmqrOwBJlwlk/4wETteq36M8Y5gt/hybcLfF2S8vqSjD46HWqyQhAUTQVYvnQjdZQ1edgOMtYEpkaVhqFsZVMLVpcjeiEknyWIXi7K//UxPez/GDW5/mF6BYcEHYOBNWcNuoRIRFyeuMVtSvvrUxJv7x+5TN++8Rd1vB4libE7Z35PKmDJa+RUm2r1JbymVGKubykHrhI8V0NBglzrcvbNbbGznHe5T97lHG59rySS8ZZigYqNbujvFnJ9JeGa8VgWHPtX3pxV3GHt93e0pkxrdgGXNJ2Gcj2C9w+wIqig/qfjCJTBOdC7XETOIxMwF11EZJhsHXKPfcL3w0cBxH54cVru9ZHaofkhnX3EGzBUdk9k3ib+Z3/70Mj0aaOfw5GRinR5NuTX17dlMzaXMZ26tcfS1MPsScMaGQe1Lh+Y7Lx1uinbP7m1It8KJ19MafIgyoG0TC3pwO22JaceE6AOYxY8cad5wtxpS+3gUFZWjEjV9SfNkc+AkVkCfOlMaP4mPshC6ieyYl6jpua2nu+Jua3Ga0n9lU+FrW85pVG5yuRukairl7/INPTc5GfiTR3576EvHQHvqXQpzkfr4l5131RuT7gp9j82Cy7+X1A3PNZN0AQ7dNvjloUJaC31+Uhnza+vuSCb7my4znvmPjFhuqfwyIlrCESTJYx2H/D+ngrzMb16qloD/jYY/bAsT4cdcFXyanbTwiDfNGIVlkLvkmA1C9fKEcf+CzB8q9VElnaHCvOpOdFG3P85y648jvWpFBy3s/0mNKC4xHd83qKpGvUL879bq8Ad+6L/6RmrJxM2H78S/kLx7LrAGpUiYkHvg0b9JDe33GtwfqSZ/vXHcdwcZYc7whYZ0w7/xfPIbqrtmzDOba7X55YTRq5DGucZClN+IQdlSUC/j2UdrvKD3S61f+PrvF1S8zs6jdX7YzChzIEb0LaXwk/JIuZmZyfihu8Nks/+VRvHxE1lcLt/vi42/0+Lqmg8yln07vLFKGrpygecBCw/2ho7zl/eqW9nO8N5iHBcJiWTWeycq/xfwFXFBufeK3w0FJ1Svp5X3Z1x/u1wZTvTZSWXMlpGV3qAzsNYx+oNUCVq+aoJZ4hoG+7Xz6qoW9ZY6xr95hPvVLc6YXsl6xuTV1MFNKHrJfF9sNpmIiWgFuE99Da/EIfT3VAmPBcTVOy7qaEo62evw5PUxPm6TqKUS5JA7japQocSEMPKSFZna7IExv6dC95/N2PBLl1y4ckJv684NvnQLmapCrqGawOnI5COjWweGO656MfQzrlc3nvlA71cmUE3dbMvI0mTCex+S/J1hEJvfxo3FdFlhAJGiK1JGfaTVVS9A93v8pDy6N3Cd5lDV0y+lEVKsYS3NGNG7y1baODgLQ/OBwa5du1SPwi3L8YV71W1es9txLnL9JvrTVwQqoM6Wzl9y4QPSY2cvRUetal1xgacOzhWFvJv20pOdxnHeA+9fB8VEufcSuuCHYiK7lIeL7u70pDLmSDjGvIEMVqgqmTKqOK6vg3NId9NIIv0kgD7Obx5S82YUu+dknAQVVmYOqwmUUWvilw7bVv96qktnL0RKfhKqG6iEVEd8uheoqZJaKqowgXx03oGpSc2iEvXsaMb5xhvjqe9uWjE8eOX+/55V2yT2CQVzg2JUtW9brH7HzZd+sG1zfdaZuAZJ/u8oCXw3HaRM8S93j0aLG5sSxv2Vzs7JV3P7c5qmAS+baNY9+Kp/ReMcG+aYJlL0DPnDtvVU+MvH074s7j5uxmR/7YQ/4XQ5RhynqarqK0wGYzpDoe/v3nVwuJi0lFJ7Ho7OUE7Xw/SJbBV7ooKd1LsBx3VeFQKLGaqsqItZhKpop3AFsl6H+gNNTQpV6tQGma/scOtY4OzewMDNpTAcS7KkklP1aQGE/eMhGGFKYc7oL42zGUp4/o88HXzJzXr3/9qRr/Reub2omrUgL3i3uj05qocuYG8WWie1MirgLMqy3jMuudQ6DcS6geWgW5Tv/uLXO7sbJPoKdTATGOcAzsOe4dUKeXsWtcJLnXAddwkd2DU0pMdbz/T4eFdS0zDjxWGtKODVBND2cd9y1NRq6frMmQLiBfTy1glsQBKo/mZjtJKnAmFoSpObBqt9NenxlypEP+HHxwvYCWc8TwJov6adVvAaz02fcqdUT1yzM1XfmLmgNmFu8jCeieUhFRymlFpLPyQacZV3lGtApgXXMljwY/pe93gm89NrD35V+ohVVnJizjMIMzS3ex3GTW51jfMOGgrGvWYGYci40ZCGI25EOGOWRi2t0epGE2auJobepTbTvQxZMG72+ioc5V1mEipyRTqHvVfate9ftGlFU6pIlIq3eAd2V1JNSrtrwZBZnsqBkkmRR/gWrzJQxPTS3HAXdNOTppFOBRtJ6ZWyYrxSIG+skbW4gtnptjWf8IBWpfzOFMakoht2fTYbUTs+8lfNf3DKpKb02ZaMNHTAfNdSngtZWxWpV5Hckd4jiIu0zEtMAGZ8x4w6rnmMCvPnnSP+Yxe8+t9jdbPS1zmB55swuWtP+Rtrlfk5+nvLC0nNrOByFd/JnYnMr00q94KUca5n/WwdDGKyDZlRdPVdSNhdrFMtJFf0XCCgMW2lNl942O+NJG/RiOVv0gWZbMc28ULKJNBWDHyB0HX0ACr3c0Fz22CxBMtVj5tIOZ2shd1MY1/RC7/QIPOA9z6M1H5y/z51XLMDxcpS6l5lhEulPPn3pd/Szu9dYUJfJxLh5BdB6Q0X19SEqu4C9NV304LWoWJNFUNHHggiTowkJh+Th5rW1Wx3wuCvh8dSP+vquXfRW1uZHspm1fJMUHMDfd5LMCRA1Z4upxQ4akhmST6p+blYLLkOO4lzbe3k4AaRXGNHGtJO1tnHwusd0lcWGuWCvDh51jjGXen4bNx0fMHD4dJSkjJiWl2gFQzo7/fhcuWVO3bfUYyBtN/pMW2rz+X9NlWzJ6p8Rxh+glHzvczevQ4eFd+/utKWjnUqKnfp0lR4gnqCexx9Hl6D3t+yJCODCic1IC0ZJWjqwKvBuwDuSphS6nIU5ISaCL/GVTu6ZmKMPtYreNL6W22CR3Pqay7F4hxEj8uufLbJVcmr8DLyIcrBPB3lKsguLlu+nHKMn+bP5MgvhSqwHunz3tymRrxuejAw/uvotWNiFFEpEEMcMGD8EF46lUmlRLnn5K8bGkca8FC4Dsm7bHbDUowMeTFmpydZjH4QT2VvEUdeZUYQOtnxlnrHc9cjhFFl50SZET++wIpKuX0Mfj3VrJaKFdaihzOKMflW+IczLagU19KBeU83i5AXHaGCDK5ZsYL8wvU4v9qa8MLGvLSUii+jsdFPTOu4pm/E0CXe9QL1/fFM4vsnQ32Voj7EXHFbJruu2Q1/roa9NYVR833f/Kvkq2Lcx5yuvZS8oJoyLIK5HvfQDIJzxTeQqhsbpb/6Ok+ORCNceYIljuSN+xPTxqDSRXyraGF4iahzbt9PI+gptx31mb1lnCr7qCiwWo/RMd1rjqWLzv7ifIy2RjSv8GK6R9WpsYhV3qUXKF/Ye2Qsmj+eU+AFvnGGMWZU4cVFzmq++fvbD6fPW2A8SpKjkurxurF61wk28JE2ieeAvCGB9H4wdctJS6oRM+xIylHiPYXnkH+5bPfdxz9dULJEcx+Iep89Vts+ETg3Mox6IxUvGjCJGTHu/0qqPGPKUZhRGFRC/jq64A9NTQoVZZ1W/rXbqNBer4+PL/HM57zGCFcV6hzIaFXP9zqvuZ+Jj3kE2efFSSRaIbCBkjErVTlQfrTY8BgfZs/n1FcnS6Tw8Cl8Du9xKd+nRJTp2+ATS2ET7A/98I2TocZK7mccYwIlXRzVhPe8d2Ch8+57rrhnXi3xNOTzO9u2davrJ/SShKvegclei+itMjkqFTsKFEq+s3xsamwQqVKu+mH/ZNtOKlflGpCncwLHK7p6ahLJ7IWp2FtCR16iC0mR6vliTJU5Kr1cxXfkb76guSPTh2opTc11L6+cbBT/S6HjH0UpeI43H61GnYUiu6o55ySyE5dAvtqgh5c2JRlgY9BKnwt+00UuQYEI8gWwQlRvqCB4gWj5V5lKwQ3d1DRUx7QVDbo+rxrGJB50nSH+vGyG0oemiC3yyRnHmDEeGPUZs4KtXbeqN99cyb2KH+5EcVy3+7IEBqhrqCLXohoyOMln5Wvlv74cI5seqRBajWQC/fSA7373hhJOoh/Z2u3tOe/W5lfPv7Xjma5b66B2Qu8g6yyDsHE1vaGfowCMNqJwRoWLSxgRzxW2MKP4VuHfHMLyPsIQOAyDs85X4/pipIUZ9EYGfOPDmKY/R64CtJFByTJcn1xebSNKPtodTknjt4l8Km76VFCASUz23jBu3WsF96ZORT1OqVQbNC/mJ36XKgcjc6LhEUxHdpSRwpXpzDPGGcmYVAhpxuo95WwaD82W7tXdVfZB5olOLjofUR9LjDQhKTZ7nr+Ca/qTRZpk4lOVxc/rwfFs4gdvvXz0YLEcn7ni1kTbob5zh5zEL6V14lOmNvnuJ1Z8Dp+xxxekfLVLm1pD7b4L+/YPAU69tA75ZWURVYS23Jsd4jvTf+MziRk3OpyJpRaqn3ONMMxy1NlkEO4nnli/VFRniQckqhEa5zsH31wxO/8S145TY9pZS3opFZR3IXWFQAysHM0QJlu7bx+4s+h0FPOxru+aZY7yLqNYFes+5UaNNRP0c3fzFjspQuWCVChntY8rFq5aQic/HguaTLCKgfuPNo+Mr5HKuWhluPkWp6ZWd+DljoEIfLlGWUnVnQ6irErfEq8Fo5TpWeI+Umz5lFgN1fZ77bhpvoldUe7AjeVnWLL1e75j3iMMO02x+rO/W/3JVKdrzq/TwS/yQVcyillQNFgrupoub1y7InmKBz01CHYRgxXWujwbk1SSN8OdG8TqStRZ9jBk8Cd8hnpabDpiRsGhKSSS5H5uJqvoL1YV0DaNLGNjk1+3uv6lTJMo3eM4znPkVfgq+Qwjax/Pcc9Dl1gTQZJ/UuIIEUByhujwvWRal79RItqi3D5jGVM+ONNpDa4yl3lB8r2ynGxREILo7ueWsYrIdDESezlDnMyncpO6L6Od+Q8cswIsadxDqLGPXPZqR9Fh9SeY+PdT4SZGDn/ZdUXlDFdQ866EkT860p9ca7rnNz8bGTyk22VLwRspzdWUDDU/qlG55h3Jl7suqK8Cn8ynPgdnfZOBrCGpCPl3ic+mrqSWY/ivViYTwXoZ/PBqmvpZHbqdJAPT7M5VycDMM6tXUAkZOKv4fvrcjvEUhiSov6aTLktJqvkHlBTJptIw0P5kxt2Rv194ZOmYw5rWdrSeSwGkqiWHAIg5X9hDs/Usc6LpQnqLfX7GMqYAQ6VgLFSdEzjhh5KBV/Uk9HxAlRrcOzlenw30ar6/bB4bVXSp5IV9TLkPC2SpTAeY4X5ax06i5fZUeARP7Mkav8sPvQ8gXK9gBJGJf3kN1cTK6i2Nrv7wc//W3z6VoMKJpG0977yGhKsvhyk/xGVuCiduNOI6HVfsiM3iU7JTARX5QG0iuA9l9Fswzcu0NzP0tFiRjQvAuUi8c5i0v0juHOpRGd7zTeiIeldNQKvWTdA57+9aMLErE0Rd7p+oq6cwq0hD/zJX6DJpiCGRMJcLdhwcLr76aDNqLLOqS2Gyi6HLaHV5usLstLyTfOQ9zJ5LI3RSwxnNmEAr9a0Wk7NNzK+9/78u/U8sdl3o0K3b6nWzuOJArYmksuh28l3znzYa9ME0FCPvQaTo85OpaK+V/OOoQFQEnVox1IR3gmtgCxmgwWqI9phY/DxUypXauB+bHPSve5DF19W8xXZ1q6fGMivpXd1EZbsYZpGSESTr2X3MqKZFD/noQ0kn/Gkilf1WTcJ/OaWxTEL9yL2WxJl6t+gCJZ3+XlNCO6tlkIl7oc6EMk/4M35zjMTjNDP/ypwhRFeOeeklM5/MuUIbTbco11lLrhFGc2LMvUHZdS+T3C+KRJ/9GDQ0C73rk6FeT7w1XOZwmh1z+po09AgMJn3BjsePvn5Sprumcz8Dp0sKCy/nICyqVieT++9J6uRVwgCz45zI9bat25xkQjV6rlpDHzKZY6Q44xzhSKWlU8TMdT91+Nl05545+2jKxH9jMntejRNg+M5KCakt1FSkVcxGTii2wBeFYeLfh2NJbEPLq3zynkeXpVro1L6L/t6HMaFjsjwOcbXLy4T47pRGiMoXOOZlXIv877cOjL2ZmJhkgVjwOvVwmEoreEZBzvL0uMH4h6lBenSF7Z1LqPxmoh4/ByqUqaDD06lyiWcd5FX5pVydWIbY6ir3jXCrmZBuA6ryespEG1JQill0Cy4zlO1NP6VfLrg3dSpG62DSDLULKQpaTxU0UWOJ9RYN1hPsqUq7eXLDGS0xBSrAE6USp296o0mrDyy0gfvWkfO1mwqbkm5AX1DTHYSZpqpv/mNRnbED88NwgKXze2/YxrrIgiBMdp5r2lUquAEjkhthbhblTjOOMBINC5tMm0ZcjWypS/i//KMVQzMMzwvIRacPdN1WW+MmLua9P44jr6WFfTGpdlLKiBlz7ZQwHD98zDpvZYx+YDBtnrxN3etP1qfGMUh409emV4zTJZ4E+r5T5zHK+AsxuhPHRFIuM9FXl8ZNwX5Od1Rj1E4ajHJMexBkN97bdVet5DE7yLeUbRJxDcIAVrC20m7fkp7yyqJsBrDUznbj986mKdditI5Hig5GlsU7S8MckTorETSlxRynZr1aE9Yu+hKvWdlHl2c8Y+ZeCnll2qlW12GCs4UWfUHe62aIHzxS7+FFXfpFjZEk4qvF0xC5nDlElj6uwkYzPJwwNXMGfe5fsTM1ysAHFjAfRtvsyDMlo7GRUiWyKbajEYMh3VmHw6yUqz5YSqWVvqqnas/NGvXzDEVeIUWQMvE/DjCj0IzKSaZyn3OEqxoPdLhzOHC+d2ikUZZEmYkjwxneC3Mz1RunkloZ1czoKASFYeByGQDq1IG4ZomCn3KCQ8wlP88o3IyGKPd89kEanmaj3I19mUzRwReRbEE2xMuKcw6lXi7lqCLwXu4g+4vuOPfIMyUGaLoSODRbBqOtpnWoRgrjqQztR+vnguHlRadeqijXCUVZkAp8QiWokJhKFdeTCvGIxoJasxKLmy0LtZh6m9ql36rxE1lfN6A5SsWMwpRFjShoEmAERqGyqEqDfYE/Ft+M/8KEDEcuI73aSEt9PlVcJEf0UBg9VjGFQWMJCosmYN5zsXh7T01GXyiGCDPpsSZrXX9dyvFYl+rgEsM0CBPGFPMllKPcJfAnvite9swRR/s/G9HBlGkZ0x8GzMZ9HQ6ISagwsfwk5I9yjkB3UBfqQ+VHTCW2s5mwcYQ0e3iKOlupKtFlUyHpnTUtxpFle4XkJQsJGHS5LcycwkBs1Jgrefyo1F96gkqNOZ4+uFVtm6NyCv5jTUM1QegvQ7toL9QsSlGkaLLE6wjubHaw29scmqXTLdyTSmguXE7HRQkY6RMB6Fixr1hIko8jsqGTkYNrXC97wUJIzUbVo+uDiVpW9dOCG1Zp8FcqelR9yZ2jlIu/Ip4ytLJ9/f6G0cJyKXWXTtRk64NAr2ZEsHWKKYkkJn1xkGNMiaPcbfJ4DwZbfqH5SO85uUjRAedS3tCIXol/oQ/AehvBJi4EZYllo1CQqHna8QVq4TAM+KSn9EOFjrY2qZ34XwjHeSn20JR5yRxDF1AQalQUjUeCmoTyolFVeefWYTXOSpPXQh3uYnBMopUMlIYImn4mDhG0Wcf3mTM/uYqpnoTrLkOv3yzFz79BSaIFD9IZaTfmpsBoHQFc1+g43nkAi0H93DgFZKSQ8lVZDG52ecp7jXJW0nwLky/Y+enNmEZn6Oq8BVivTImZsq/OYmqMnplovLGjMX3cljSFWbg1piZhQpx5sdVB9CDmg3wcuSd8St9tEh4Z+FCRNYA6m/ATxsGBs8mtTCCBpIt+ci6/+Er+ciWVrIsplA+mM4kbxEUmt5U0NufKgI9KbKHivBdjhtqpijbF5DGlmKakImiVQVzumVD6gTd7J2cMkIh3gkSgJ2jWemh4JuTt4tJNU4ivUVqNwwo2hflgHKVe7czSw+uBqV8mbTCdMs529l+aNRpP1YGl+eWdnXP8PukjrRMptnPAjYheX41XgZg+vVETttFD33TX5rvmGGhsEt8+briM5XibmF2L+vazyzXrGkfZqp8puO17a4YYlT014bRlTCqDtFwT9Ah2cXwYaYC/lXyVKQ4WH533MZ0wyA1u0r1EFgwXj1nd3VqmxpI4WGb+C/Vt2jlXXurlqcAkOJ8LJqic/VLu/P342G38hrEhL5V+kcK9wT2eT0eRMyosf+Xdpt8PWmzNpc/3M+qjb04kLhCV9v0YJzQk3fNrPPN+z+iVJIhSxuqwXOWCtBS5PDiDYeg/mvDRQ8o8dof62ox+mKikx/DWhUQ/RKKcZjJdPqGYv0Kieozo1m/bGku7m9V9YSacGEJEv0YDgZHCdPkl3ezAU/6zAEC5F2OA2lb4nEZH17umHgZaTRvDXG4+18JYRc/FbrmNL3/J8p6J2YNK+nBbPzNCZjXkLkLtLkpg5k02/A3Do/RNdvzZwT8rtUJlZpJFuDptGTN+V7YKMOpQGGYf50Pt48NXRJZKnqIC4WncfHjX0qeqnqwvju1mhjEDeEA1kD+tbfGAWkkH02SMG87oX0psqYnXvcr0nQqew1nsQ9yhFZ6uwCLopMGJmX06BzGrox7JvOw7+P3S5L5jKxhSXU5L8z66e++E2zyZuhFK08onF1EQOlEzJo3bGM4/tyc8539/oe9Pe3IRpg4SazwRZqAzxDnHmKJEECqFP56gfetkb680gFEOxsH1IS9PP1MdRJuV6CUDD8U0CndC5lzPzawlomSWD04QhB00RpsBo0D+5x8XPwpNkKpnDvi8Cd/kB6aiyMLs2qltCD1nHTSRxOWrD4VhmIDtJ7R6fTwM3gCLsu9TvEQLc/e0Zkw+oNSTbOia1xiXeBSUqnEEJS5I6EuE1zcH7jsOr/vxjMGTE4UtrjJxfcp/NTnOkVoFGWEFFO7L9hwe991vo3Y9Ag1a4piG0JO0uavpVNwT1Y8HS1mAelOTE3yIaY53ZUPnl3i/5Yxw5hNxjFPnE+cvGZDJUsf34UbjW5lk5rn889lH7GzpRrvM28VE5X3yQSjPpJ5/Eh+HVTPfB3+/Sr1MA5UtHztKIxKuPQydi9FoCusffmg98VQgKz9mZlLhitgeSZY7SVemQ6aCTJP4vreEt8IMDxvnqSelTqThj/aL2XnjqrVFp15KpVzo+4XALDTtBaKHRU1Yd4g+0Pdhtr1wavlmj1ypmOzTqlfjb+am9Ehz1wIVZKqC5itOVGFzXzuWNKVz+tDuhzKT2bFX8av8T3DbC4z6+VHndIqqVGkhNkUwJmaQ1Mac72fd30AV+yT9M0Z36YVJ5sJH0SFfougy90cseXQ/nctHRhUG9bFXvsIIU+diZ5jMKf1CKc+I+eNUxOInYZge76cs2/kNV6pQ0tjiCV4GYS7a27odTSQKOtU8Weu5ehVXK6YwyD2s4gCk4pVAXZazTIqSHMInLQ3fCl7p0qm+eBliNGLMQJkexnlfvnL7bTQypy5UwvHUlSyXMx/S/Hhg5xh+Tl/AYH0bH41Rz0pVBog1LkhCfW3KD6/PYk6zEC8SsU30pyD/3Gkx1ijMk2imd9/YSMIETzKq+898/LeYSI8amYgkkWOWKKAt95inIFIj85WXw2rX8uoxC0VMGcflZUWfm86OU3DD23v4yqQKv81cZdHlZ/kEfZzk5wQKqOQflz2iLoZ14y1DJjA7KS3TJvmWpXgy3lGiyEDamiblrpJYonI2KF+mUDbxHlMWTMUpzL0rrws9bHH1xrClKxrF5nvo+uGmBuY41wMN9wTl0iEqt1FjpNuFT6cXSsc8OU9Oe8YUGDCJCt3kwBFm2X4IvK8Is1aGR5wwY3+qnPclPJwdMwZfRaLKZGc3ChDlo1LdqHBMfJUjIMvAnJreI2E2/CGGQqjmsi+LpJ2ZSso5VVieyWNGChmYRmXLBy6ieFPXBW/HEiiKc5QIj9UHme1Y+JRt/cfCOu2zY06cU55gXJVn5DH9aMZZq9qUZoDsAC+yk/iVjQ3Qmyn9EhqDC4WQqJyB8Tp4RfqX1bkRKSwAeUqVSIHTSuOFkTpLnWFRdALHaTRo9GsL0ClMOnXOc2w8zEAAUw4M1M3pi09FPEknZSvSSSpDNdmY3t4l42Yy2IH0+D7fYc4gy2wi0cfSppEW+DIY5nrS4L5mqrrPjl7y2jBMSDqxm5z6ttIvzAdhKhkRAUgMEZyKWz9s2nl/NnD8NzAT+jdE2ktQklHTXMliunItPwn5Y3xV1V8RSiPosdtxmvPgLxz7c2xhSwfJ0feHMKLPRgNc0+wY51xYFtEKoBtJ+UKKLKkKM9nMUSTWE8Rhb4+KgXaGJVgwZre6OTnGmnfGEZbBGAwIzW6mKtKKI8hsDpZJWRNsRgJ7h9WPPXZjWcr87cVV0hR724MMlBU1hK+yFAsW7UxhTFF3wmAi02uC4BE+wIt8/LgWl4dCpOa5zP6/i6OoOHMqVbnkO2VVUzrLXKqsGtGTpSoclYxFkJq5RqexHD15JuV+YG/XyGRY/1OGnP8FpmaeVhoMoV6QQ+6y1EuKvctUioL2hnsZ0uwdN+ED7d74jkrlETO4er82xQR8GwQLJMvMnKO8jJOl9o+pTTvzmm9Envc3Y6N9w4yq7uL1UJsldunAU/6bBpKtXdqyucupr21yNXuIsIFu6VTlnwhNJG4TuKxfXnes029iWz0TCk2+O3/LB3nZcQi8Vpeq56Of+nDGMKZAxQhg2s2Er9Hr+g6VQYb3yyII2vTPAvGruhGxtpHumrSqVYfzVKsZTjdOZA0rKAwfjvxgoun03IyvGJVnEyK8rbfIwuXpCMXPpJFRq5/uq0lmHkJKPIAEzq1GKaAtSWdd5qnJbelSRsco2hQOzBSpfgwZtg1mU9+vxo8tlj86kQjxvB4sI634HoKi0JuNbtQSYLnnjN5y/9zVFpvUTVne/y2SP0/JSpQcsgQeCoyyxnNF4KUvdFJsfyEjpyyFK5swTl70b0STFTbQWG2S9etd5bV7nnMZQDVUpinuKVUfv2d+82C32BCf8nBGMaZU6IGJuj52sv0xyD2NtU3l/ow4HUl69OMAABmOSURBVJb9L1gZQZWgj1b5M+W/ygh2pCars4ygwjhG5vqiEMsqTnMDLlRmrLjDFAMgbZ2dm2dPcudSzTywAiU4NKoOZEL9Tcr3FJWUaU4Js8o361JixPHypeFaTiUe27/79POwh/32b/f/sUxhVBFuVjBUbRA4y5E4BVMKMzNG1eD1wjFGVJmHnRtEnR1J637mXXDUhSVRpaC1x1DqsiCgnxliHK/Veq4ZpJuZbyUyhc/Jl+6K6srocDPLAZhSci6BLr6AK9GMsD9Ac/JUIb1TeX5GMWYOqAxDB7tZTsGmsuYQH3NR8WtumMgkVXiMT5uZyqr4d8ZISHUs7ThWUZ3NFdhs7+mabDTpl+Csb9Lp2oO6DOXc++TzKPV6kQBDeY6Iiakuhn94JciE4UP948Gz1YIyqH4oe482YGOMm0odDS7ls84fhRbFYKPdYIgd54vO75HWdIwlR7C5Y3BOiTFIhSIwR6uwqHL0RaS9mDauvWKSChTJUcbIRCW/hHWfl1A/usC0YkHIf5jGlQZtZF+FLE7a4zOOMUVqDjUkByfDzBMsDn4SUGf0dxYSuV61CY9f9ZmkE/TxeYenpiRmfWrmGbmjU2xSswwmrrqfJO+SbnMGGFDZBp89yHpBJHNMPBLGs/KZ8W4USBgnZh40dqMHWcv5mOME3/3VgbtHZsQte9GVcDNuJ+vmqMRCb0ofmEoV3YYxcWo9SEvQP/Vg1gk2fRm2vzsAc27nu1Tsz1PoOrITpnwf8ZtFnzyxIKix2EAx4KfN+yHXWnksnoVsSh3Fu97TPx44XHFQ8cTKV33qM44x5dXu3HdnOpFx96BibqMiResIq3/l+cU8uGJHkA6DYdZOMl2TM7acVYGkKnOL/SCdzow7uaqS94HCErA/pn9oNHNgJOM9mDbhM1QSVngQojzijGZlFyfnZoGXHqZDzG4sFr5VUx/spZIXTRInnP4rKrhqHKnLemY1JgtY3eR5KU5OWaYCFLE61P1joT9nvelUJAbXnMzkUeCgn1neSoscIGnEOH8NL7KFZW7NuZcuIDe/U6GJqo0LE30+KvU1MZOWp5HDez8+g5+/j2m58rFP3tMzkjGjijc6OswWeC9QmV6iEiN0Fif0bus0ExlvlD1IDmAGRz+wWE5SkXH5QwvNfhubdm0+WjeP0piP9NwzMRmkXuQl/lk7wQHSRgJT/kpus3OM2UaqoTxn2zksfFhd8Tjb8Dxx0+6ZRurly3GXbnITDThNWuUxoikSK6Yd5xifCwXZE8Rh+Z3Te7guW1JiogGYRF12DAO/3Yz/oM5WrF4SQQbnOnlV+rfTOZYvd7mnjCNgXEIMWRHEQFxpmoIdvyEa3Bcb1PKDvHXpyOWyXIRnFZFbhDwXhOSAas+6E5Pso0GHHTVzbvVdkGyULIsK3cSwHzp7aE4nI621CGnp8kUr9E14YQZj7CJRSt6icpjaw6nBpJv5CS4MHoUB2Hh1NjvOSi61KBJ52N0a9bof6Mc+OM8RxfuxMZ10laixa5nxRwOdWS+nS4CqoMMxVPaer5Yx7aOEprN3icwH9lD+1+jwzSQ46xVOg8vQ004fYxY7LliTqjxgdRILfMYypvTPMpPhUTyjPQxeL/FblL6m5HN0bPyYCdwdrO0SL3gs65tb37gTmc5RjotrPHXhI0xyz+c73sCW5G+la/cMT3j/i0nx50ibnSMqcwQjhollKosx9FvpMPze/snOx+eTn5S3r/lIPbyzEQPRy3HOFXFRnhkL35AGQPwZHWHkmXnK8oEI/ribPYywFOMJ5n7zFMunq+KpCHRR86sZia+CnDTlYhurekInsfNU28bOLvAZy5jyIjKvydqTV1j28yCtPV7bFidsXb2aBRqmPwgxO4vkFPnEjFGQIZ9YHOU5qotJ7hvbLzpS7ejsFI2bWf+XqMW6SZt/xDZ2HzZHRfs85ERgqEipEQ7PJJPOtz899AdFpzGmiM86kX08ak1DByrsFYzmYoQR6xwx7Rnn0oVOM+eEqjf5yiwycy5FnW1hq3VYeXdogv7Ko7NzSMy5AWvLMptxfvthpgUZUxCaDOaNZVWwx0ukq5xamlO0RbtxRjOmSLPXxif6w9B9jMojrvGLVuQTRm8bhra+34t2+TT8yFIqKM4aX5Haiy0vq2yZAjA4yMqGF0Sa5jwyp/zm8O7DA9kx72HEwrcgeUxGSGaTiGSQxpWJY/YwUvqd969tqMgws2ho1dlZm3KTlNG5HolIPSiSUZyIxxh3syfItoEt1diQsr3tOCq/+yaYHOAd5pR/VlmquBR/RQojD/MIllJsNT8L/CoozI1C/9LRxxhAe6VvfWrRGvW5+VZ354xmTHnFu9XdGT878TqV+lt8LgYmompb3dtXHaubaZOJfirEc1RQPH7PDVL/IjVXy1IjdZ6n9Yd2r7tj3lIz2u+kvvkgr/GveH9/HGbH3cfMgE4n0yN9VKofNbSM/lBv656Xeic7Y4eZ+qUJN3h3QgcXxErsTOQkT/nBVQjw8Kiv/efuV7dU1V1Ypg776SA8DEejzpqKnidmvt3cK8qB5/dwH1ZcjzBQsyOmecJVl6GALOaD4c7ueeI3t4QLf+eE327hizQ/iiJlUqPpISrBM4hLrIFMVZVnPrlQMcxQc/1EaNzXQ1+/FImXWQRkUCiqzAxgMvXAqgbzbtOYudTcXNlEbxYptXVfd5pZ05d8R/0v3ukVVLgpTUDKwlAjzrP0C8ybfvvqj68oOuE/m2b+GkbTb7Wc05h1nSsY1f4gEl7M2PKPp85EAyDwViwfU/oN5RqZAqkqiMsR5kFw/8j+JjSWMTJVJZ0TSd6X9KO0ei/XJMKn6Qo/H9OcE7XqG9CT0dhhvL0/z/YHFe2Jqya8gBHPeMYULG5HamYyid2MUTxExVsUa6ArtncFA354OFTuE+z1iOMtakzhh+BanD/KD1ATjEiuxzHKx3btasXD3lR9L0xR8lxIbz3WMkxF/CkGA/9KRKQ1FZQHkKL7qd/Em8GD/eOpF3R39xTTliRY8OBr6vZkk0mug96HIbgufhS/ifzNv1NOsZWiD/hO+MzVK9fsLyBT9pRKb/pGUvR/1S7ovAnVPNmy6Yo9JCHvawax0d2pjg4dYLOhV5m72cf9eb13IW3KhNKBf6YwfOmOw1+cV8NWSGcxz98WjCkVYdWoOoYTpZ9x/mN+iyA1maNzJ/qZlniS3bzeQIrN4LZIlc2N1lJp0HqZRwud96jA/eDjHb8hK/Ujtqr2Y2r6z621PTQEie/C6Y/JQAWqOm5/ZGQ4fFLVjj/w831/Og8LH6XEwH5Zq8NezepGVO0beQME20yeyRcyOsZGBXvZCO+RK7bfOi91GeP4wPXDo0y0vAhjlV0PWgETMZ44iAnm861qMPSCgJF4/xmE3nHT5L1ldHe/63hVawEVyrjgj98WjCmo3KzuzCZD9w1UsEdoDXvxDjCzxp04dGagbW2agVI2MQ0fpeJOGbVHpJGUcZBs+RmNSxA2xnH1zzW11l720xWfrbhWM0dg6iBrNxsSI6/h8+fvIf8znCUfZFL1aTjkOzf9h68jiaoPDJQ5qmlFc00qsQWDhJtRvbvYfi9HID7mr6T8VF6MZ/RQlr7lxGTqZa7nhWfkQU9P9tFGPk3aY/yqL+x0TD6lnkA07j5XN+y6ObLMEZeS+gVU2tyKnOnI1Z1F0nsUwozm979aXZqTH+ttw5hScTaPpHBx4T9LfXuaWnTcLWqpz7B1W3fgjalDmWzyx/jS2cfUyFTI1/FYxZVtpaUmG3Y7UFe5jvm1hobJTfPdmJaqbK7Ye89w4I88hpT8iyAM/no49O/dOdLyI91dvSoHFvqyjvF6t9a9PBM6/wfGEpcI702veY55Tv7KT5iIf0wRqf0sAXl4+PL5M4F8j/rhsZFQebK+ce8UUPM44f1FXR1E83zp5/u+IN4ejDsUjBrfYdtALQN+86CWjxppU71uqJ/7TO9f4qbm9AzzmgQ/PV9hulRb1Z3BjuAPD6DvfJee3mV8uBUwx3SEEzyTivHI3q6xrov6nkO1eoTrNaiw024tGVIozA0Vjq6caqcSfYixzWE1khwzW7t3z2cUVSq4OqhkjeADud9830I/0NVd60+Ob2Zbu1/12a6QDhbfXZCRih2zohCVK/kRuGlGMDrYwerh7cc7aimqZzpoxkdr8hkmDa+CbkFTFuVT9g9cSZfEvIWjsCfyEWVH6yV68qivEs/At1vmS5P4LCQP92fdgPSnb5gXUKfva8Qlk0o8MJoaxGz1J1Qw1tadUN+m6OtuZUPaGhUcyfrmZ9jPFthXUpdz2l5BBafJZ5TWGPbNUL+Y1P6vPPvWwfXmOLd0L1qgMjdFff1yx+cbhtPjF2L68KsocR/DsU1dvvkQI/hY6sTNSZ5Fkf4scdN72azl4d/r++PDZbIo+0hUzzHlsnomlL7cvFRPMKQYWrwK7PbDmtfzGfFOzL/U0FAFLxCn4mL5fLrcUWgiJZ1XhlJ1+2c9O60u31aMKcjeCeMkw8E3XXzqMBh4aKHRlgrz5I6+4YlM8ETWuN+DG/F1S+CTi7yhIkUyKK7q8TkMK3aoK5Ccv5ZwvF9/bTK16ZHVv44bjyjRQhcxoicDPWvYJmKZCa9mt6XfpIX4RBA6LXmmlPLlf/kCyBtwj3ZE9+M757FxXScDaflXyUer+ihQ1A+NjXuh8zqqA9M+86puuAFSfS6WTak1PYV2rMY91j/BKO1evq9MJVVdHr5PbomXeVr1KHz7nr5hXkidvq8xXTKpDB1DNwynHXc7LePjqLTzGk2cplT6TCTBW71p+prOtxnLfwlmxMdcXM3FoLMwxNUm+ksd0+einn0iHfifTur6q55Y8bnW2bt5FaY9znN9n+pOum3LljfVZ2+s1c7tGKj/KozBFnjThZMSyccvKJ9kJy3FOOtcd0w6zgOfGfgv8xpgEgKzgxgbZMKgh228ZO2s9BmrCshyxqb0EQr4/K3b75nxDYVmIhQzOucZ3qhqmryejDvsZ072WSTvPNJVVeQFjfS2Y0xB5xZ1S5gxmYNsT/UAZlxvUSEWFDSomQ8NrB9NhhNMdjv/iop4hIqH1hrnJFJTfhJiVsj9FfPW0MGdhnML+zV+viaV/kjboSNrn+m6tW6+Ru8x9Rl/tTg7/kbL7zWHLRMb2WLs5qTRd9TgxR2VFV86zH4WwCBKLHdmlg8Dce7vxzXHt9a2LJnq183IZZ4XMjo7ibUUg2EvI90GqvkWgi+/SWxt9427/hukmW5RyF8axnHl9xMJKyA1WI3UhAbr8pwhGqddYZg6bvV8nq9/3NHflowJGmbv4OA47fML1L3vUyExC1vYIPOMh5bvPYrXvu9Qmb9H3RnKe5WVAfloUJ4s43xzuXPgEW2FakGKsQeJ+r/CQN+m67wbTdfg2kc6P91w32b4SaY2qgz42nHvVren/qbps62NrU0b25Luh2tTwWfI5nd9o69jt+mpPU4KSeZZsqB8Mkd6BAb+AStpvnPT7jvShfGP91yYqqZ5cpx9XV5j01yspmYyWXG6MBFrP9mRdntzon5O3zSCsUlNOFo88xu2m68KLmHMo+D/zLUzVePiRTjFd0/6qCwgUi9pP2e038VRINJ89JQZRO5lG/O7VfebbCfwA3TI65nX3MCypRyHzIha9AI1SrIvG8Sh1jNd57/R0Kr+JxYFXUyfvBeV0Y2sG3Kp44P8jblSCAppQEjCNOu5ug2Gfk+Np7cFXuLx5ePLXtu2+uiRnfXdAz/Z2WPOxyFYsULI3p2ZFfXenknT4ofJVfWJcHONMlvox17P9nzrXTYHEctvrqNGohgRYU6JQ6DS6mOsgfrxhBv+/WcG/ujA76g/Lpbtcd1bcfBg5mDT2jcdj4Yy2myXOd6crC5GUCoIZTvETOrTt/V0jxeL8wQ0r29evU97yRch9U7ilOROQZ4fC73NvoynduE1YsGn0oqV8UTunVTGHHdGTdJP0hKz4xXOmMsVnP6YTHBPYBd6vH5YzMCAGm/pyL5ojPcwecoeFnMsXeaUQfKVBdE4LhYf8BWCuQLvA680/c6LGTf4lyR7jFAFVpE+qiQ5doxUxogOD6L6KNWEABOLfV0d9reXJD3/gkzovh/V+DEv1DsHhoZeX9dVgz1nX8bJJNJMXcSJhITnuqOmvoG51I7WhLcqE6qr2axlC97AZENbRwwHxDSwkBklcT77/FGeo+ZycMaJ/iLzpPd3LL18h+6r3CiRtOogqueX9O/3e2Ln6qD2K70UFyCkLyxhjhzjZJRvCN9Brycd541SmbAhUfi14I5htrp9jXnOAdqfGX3ownRRXVKaKRZ/e2siVc0KmcLkp+T8pDLmqo6G7OHD2d2BCb6J5Dy//BtLTTRHMOmq2uPbbHp08IMvq8/3JEPUTa2XUSE6K9nqCa9QYd5E7XlevBdUYk5R1e575eZj6zY2fR+3IsswX/sttnAV+9gC5hT5IOwgzMFbyUCR8Bn/caClcMcpmgHOvIKNMNRGWqTAcYMBzOb2wWdDfpJ+FHugk1y4SFiujv7hOfRqz0uosLEGP+rCjBlZtRjlEmU0o95L/pI4H+LTyL1Ymld4GVOYv590ah7+1M5bYp9D+YgLcKRMpnuoZqSxbeJpVpkzWq4ugizcP7cBIC746x5k+LePHEuUHFUX3O8evX1Yp8xT+N9kZVG4DpSL0kQt9nnweqC9h35znl4eFuD1j4vE1Hc8rtTHkUg2kz3Y9ESzW1t+Fy5awDBt/IlU45KeO06sv6PpgyWzbU1LvIRpZl+rsqUOHT+oyZjhI/2JIzD2jNHAcgmlX/jqxQdXocn+lvH1f6Di49wq0ttj6ZVjCpx6RXIikmgwk1wJUwmXstIjzoK4MrorcQgsAtEZWv0kUdjsSyquqqH/GNPhgmcRk+fiRwwp6fP0YqbMxc/lETVQRtQ753VfB/8zrdv+6lNY10iGixVuZXBqdUN7CwtBO2rY57lYCyD4e1lvqL9PHa0Gf6G5vqGptS5V0+6UoZn0mwZ7e8eF5mk9GpvHPlcT8pf2eCIIyBKvF1/tWJdSwadRiH+RgZ3lMACblMXMIzVCGDOSebmMhKnYzCTX74yZRyRbPO3CdY4B43tc0/QLAwozy8cTmkTnF6uvQlZ8+UUjrrl882klQZS/RDGsccSXrXHNP/T56u9/d/DLByStDacHAqIe2bBACNy1a5d5z5E1x1qb8Sgg2+Vp1cWvGaVcdDaUAAIMJQyS+xMxkDyQnzBQHHLSTZhS4hPyzJdPJ8doEIljXmJOPYvSxAwsaWUASKjIbA3qHtnoCaK8xgzCP6Y9929+u+9LJVVGSW/DyUcg/uonP9+3dY6i1j63oY/+pvm4a4JP0Z9eiw5KvxBWKJCYwoh5yRersznmhGtEYsaqaXwujJlXVaekJPHkvqilrBFlMEnYLo4nceU8krhylHhsAcxhCD59jjGu/682eezvP9pzb9FRT+LZcAoRsIy5SODLQIRY9jTWT7yXpV//J4M9l/qhkT1UhDuYy8wxDvnnGS7uE8b386rsFIMVxBMmk/tTDMp1oSorXJhn7Fw+3NEyRcCiYP3YmBN+I9V55aO3LMJAD3nYsAAIWMZcABBLkRBu2H7erU01SWcLxuP/jhHWLbDkypDta3nmMI/JjkfTfcZIJYVYJPXkyPM80xJ/6jzPkFPMCZOKrjoVlwjSx4yY2zhY85gxJDL2qubhplT2H9538KunpTuNUjiejfdtH3MRv/pd0L53cHt6Sd9H3tjUdOwJnYpcL9Yw9y9+dmqlx0fAKJQB/ZwaKhwmraX84r/xmVyJVMyHSBLmL6LbotbmnsOJ/EN7dsZh1n1sPritP3Tv6VHmf/za4f/3zXwyezx9EZj+0qdvGd82JYsWSo8k1yZM+EvYj96YUHol7LYsE7hsUy7Lw2KjvrifKJJzpsTMM6NITAnSL42kZ05ici37Y8rcvQzuHMqGasdgmPi+V+M8+B8OVrstX0zb/j21CFjGPAX4373u9tQGP7lmec3Ye/EhtDUTJFajfC6jH8oWcti2BvgrkOFbrCJgPOmPwm8iMWN1FXFIYEpdHskF0TjJwJj9mNj1sLv1ntpE5rHljf73N738dZkGiUQzRxvOEAQsY57CD8Vkt/POc3pbQyd5BZ7Or23y/AthsA5cfzTCYA30S2vhOxylO3XcF4lKacU9px7HwGASpp3Adkek4wAG3Ycnsu6OXpX4qVuX2vnJfd3HTuGr2axPEAHLmCcI4EIlR6Tpgzjs2l+fWKmDiVXZtHcOIrMdKdgI0y4lnwSDOVgosorKU73s59iLtO2fVE7/oUDtWVfbcOiGfd2n9eLfhcLK0rEIWAQsAhYBi4BFwCJgEbAIWAQsAhYBi4BFwCJgEbAIWAQsAhYBi4BFwCJgEbAIWAQsAhYBi4BFwCJgEbAIWAQsAhYBi4BFwCJgEbAIWAQsAhYBi4BFwCJgEbAIWAQsAhYBi4BFwCJgEbAIWAQsAhYBi4BFwCJgEbAIWAQsAhYBi4BFwCJgEbAIWAQsAhYBi4BFwCJgEbAIWAQsAhYBi4BFwCJgEbAIWAQsAhYBi4BFwCJgEbAIWAQsAhYBi4BFwCJgEbAIWAQsAhYBi4BFwCJgEbAIWAQsAhYBi4BFwCJgEbAIWAQsAhYBi4BFwCJgEbAIWAQsAhYBi4BFwCJgEbAIWAQsAhYBi4BFwCJgEbAIWAQsAhYBi4BFwCJgEbAInAQE/n/slhbNh4aHAwAAAABJRU5ErkJggg=="
    });
  }

  output(){
    return this.qrstring;
  }

  padLeft(s, n, str) {
      if (n < String(s).length) {
        return s.toString();
      }
      else {
        return Array(n - String(s).length + 1).join(str || '0') + s;
      }
    }
  
  crc16(s) {
    var crcTable = [0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5,
      0x60c6, 0x70e7, 0x8108, 0x9129, 0xa14a, 0xb16b,
      0xc18c, 0xd1ad, 0xe1ce, 0xf1ef, 0x1231, 0x0210,
      0x3273, 0x2252, 0x52b5, 0x4294, 0x72f7, 0x62d6,
      0x9339, 0x8318, 0xb37b, 0xa35a, 0xd3bd, 0xc39c,
      0xf3ff, 0xe3de, 0x2462, 0x3443, 0x0420, 0x1401,
      0x64e6, 0x74c7, 0x44a4, 0x5485, 0xa56a, 0xb54b,
      0x8528, 0x9509, 0xe5ee, 0xf5cf, 0xc5ac, 0xd58d,
      0x3653, 0x2672, 0x1611, 0x0630, 0x76d7, 0x66f6,
      0x5695, 0x46b4, 0xb75b, 0xa77a, 0x9719, 0x8738,
      0xf7df, 0xe7fe, 0xd79d, 0xc7bc, 0x48c4, 0x58e5,
      0x6886, 0x78a7, 0x0840, 0x1861, 0x2802, 0x3823,
      0xc9cc, 0xd9ed, 0xe98e, 0xf9af, 0x8948, 0x9969,
      0xa90a, 0xb92b, 0x5af5, 0x4ad4, 0x7ab7, 0x6a96,
      0x1a71, 0x0a50, 0x3a33, 0x2a12, 0xdbfd, 0xcbdc,
      0xfbbf, 0xeb9e, 0x9b79, 0x8b58, 0xbb3b, 0xab1a,
      0x6ca6, 0x7c87, 0x4ce4, 0x5cc5, 0x2c22, 0x3c03,
      0x0c60, 0x1c41, 0xedae, 0xfd8f, 0xcdec, 0xddcd,
      0xad2a, 0xbd0b, 0x8d68, 0x9d49, 0x7e97, 0x6eb6,
      0x5ed5, 0x4ef4, 0x3e13, 0x2e32, 0x1e51, 0x0e70,
      0xff9f, 0xefbe, 0xdfdd, 0xcffc, 0xbf1b, 0xaf3a,
      0x9f59, 0x8f78, 0x9188, 0x81a9, 0xb1ca, 0xa1eb,
      0xd10c, 0xc12d, 0xf14e, 0xe16f, 0x1080, 0x00a1,
      0x30c2, 0x20e3, 0x5004, 0x4025, 0x7046, 0x6067,
      0x83b9, 0x9398, 0xa3fb, 0xb3da, 0xc33d, 0xd31c,
      0xe37f, 0xf35e, 0x02b1, 0x1290, 0x22f3, 0x32d2,
      0x4235, 0x5214, 0x6277, 0x7256, 0xb5ea, 0xa5cb,
      0x95a8, 0x8589, 0xf56e, 0xe54f, 0xd52c, 0xc50d,
      0x34e2, 0x24c3, 0x14a0, 0x0481, 0x7466, 0x6447,
      0x5424, 0x4405, 0xa7db, 0xb7fa, 0x8799, 0x97b8,
      0xe75f, 0xf77e, 0xc71d, 0xd73c, 0x26d3, 0x36f2,
      0x0691, 0x16b0, 0x6657, 0x7676, 0x4615, 0x5634,
      0xd94c, 0xc96d, 0xf90e, 0xe92f, 0x99c8, 0x89e9,
      0xb98a, 0xa9ab, 0x5844, 0x4865, 0x7806, 0x6827,
      0x18c0, 0x08e1, 0x3882, 0x28a3, 0xcb7d, 0xdb5c,
      0xeb3f, 0xfb1e, 0x8bf9, 0x9bd8, 0xabbb, 0xbb9a,
      0x4a75, 0x5a54, 0x6a37, 0x7a16, 0x0af1, 0x1ad0,
      0x2ab3, 0x3a92, 0xfd2e, 0xed0f, 0xdd6c, 0xcd4d,
      0xbdaa, 0xad8b, 0x9de8, 0x8dc9, 0x7c26, 0x6c07,
      0x5c64, 0x4c45, 0x3ca2, 0x2c83, 0x1ce0, 0x0cc1,
      0xef1f, 0xff3e, 0xcf5d, 0xdf7c, 0xaf9b, 0xbfba,
      0x8fd9, 0x9ff8, 0x6e17, 0x7e36, 0x4e55, 0x5e74,
      0x2e93, 0x3eb2, 0x0ed1, 0x1ef0];
  
    var crc = 0xFFFF;
    var j, i;
  
    for (i = 0; i < s.length; i++) {
  
      let c = s.charCodeAt(i);
      if (c > 255) {
        throw new RangeError();
      }
      j = (c ^ (crc >> 8)) & 0xFF;
      crc = crcTable[j] ^ (crc << 8);
    }
  
    return ((crc ^ 0) & 0xFFFF).toString(16).toUpperCase();
  }
  
  
  generate( opts ) {

    for(let key in opts){
      if(typeof opts[key] == 'string'){
        opts[key] = opts[key].trim();
      }
    }

  
    const p = [
      { id: '00', value: '01' },                    // ID 00: Payload Format Indicator (Fixed to '01')
      { id: '01', value: '12' },                    // ID 01: Point of Initiation Method 11: static, 12: dynamic
      {
        id: '26', value:                            // ID 26: Merchant Account Info Template
          [{ id: '00', value: 'SG.PAYNOW' },
          { id: '01', value: '2' },                 // 0 for mobile, 2 for UEN. 1 is not used.
          { id: '02', value: String(opts.uen) },            // PayNow UEN (Company Unique Entity Number)
          { id: '03', value: String(! opts.amount ||opts.editable ? 1 : 0) },       // 1 = Payment amount is editable, 0 = Not Editable
          { id: '04', value: String(opts.expiry|| dayjs().add(5,"year").format('YYYYMMDD') )}]         // Expiry date (YYYYMMDD)
      },
      { id: '52', value: '0000' },                  // ID 52: Merchant Category Code (not used)
      { id: '53', value: '702' },                   // ID 53: Currency. SGD is 702
      { id: '54', value: String(opts.amount || 0) },  // ID 54: Transaction Amount
      { id: '58', value: 'SG' },                    // ID 58: 2-letter Country Code (SG)
      { id: '59', value: String(opts.company ||'COMPANY') },          // ID 59: Company Name
      { id: '60', value: 'Singapore' }             // ID 60: Merchant City
      
    ];
  
    let otherdata = {
      id: '62', value: [{                         // ID 62: Additional data fields
        id: '01', value: String(opts.refNumber||'')           // ID 01: Bill Number
      }]
    };

    if(opts.refNumber){
      p.push(otherdata);
    }

    let str = p.reduce((final, current) => {
      if (Array.isArray(current.value)) { //nest loop
        current.value = current.value.reduce((f, c) => {
          f += c.id + this.padLeft(c.value.length.toString(),2) + c.value;
          return f
        }, "");
      }
      final += current.id + this.padLeft(current.value.length.toString(),2) + current.value;
      return final
    }, "");
  
    // Here we add "6304" to the previous string
    // ID 63 (Checksum) 04 (4 characters)
    // Do a CRC16 of the whole string including the "6304"
    // then append it to the end.
    str += '6304' + this.crc16(str + '6304');
  
    return str;
  
  }

  getDefaultOpts(){
    return { 
        text: this.output(),
        width: 256,
        height: 256,
        colorDark: '#90137B',
        colorLight: '#ffffff',
        correctLevel: 2,
        quietZone: 6,
        quietZoneColor: '#ffffff',
        useLogo: true,
        customLogo: false,
        logo: this.payNowLogo,
        logoWidth: 76,
        logoHeight: 76,
        logoBackgroundColor: '#ffffff',
        logoBackgroundTransparent: false
    }
  }

  getFileExt(filename) {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
  }

}


var paynowqr_base = PaynowQRBase;

var QRCode;
var allowQR = true;
    try{
       QRCode = easyqrcodejsNodejs;
    }catch(err){
      allowQR = false;
    }



class PaynowQR extends paynowqr_base{
  constructor(opts){
    super(opts);
  }
  
  saveQRCodeImage(loc, opts = {}) {
    if(!allowQR){
      throw 'Missing dependencies for QR module, Only non .output() will work;';
    }
    if (!loc) {
      loc = 'output.png';
    }
    if (!this.getFileExt(loc) || this.getFileExt(loc)[0] !== 'png') {
      loc = loc + '.png';
    }

    let defaultOpts = this.getDefaultOpts();

    let finalOpts = {};
    for (let defKey in defaultOpts) {
      finalOpts[defKey] = !opts[defKey] ? defaultOpts[defKey] : opts[defKey];
    }

    if(opts.customLogo !== 'undefined' && opts.customLogo) {
      finalOpts.logo = opts.customLogo;
    }

    if(opts.useLogo === false) {
      finalOpts.logo = '';
    }

    this.qrcode = new QRCode(finalOpts);
    this.qrcode.saveImage({
        path: loc // save path
    });
  }

  async getQRCodeImageDataURL(opts = {}) {
    if(!allowQR){
      throw 'Missing dependencies for QR module, Only non .output() will work;';
    }
    let defaultOpts = this.getDefaultOpts();

    let finalOpts = {};
    for (let defKey in defaultOpts) {
      finalOpts[defKey] = !opts[defKey] ? defaultOpts[defKey] : opts[defKey];
    }

    if(opts.customLogo !== 'undefined' && opts.customLogo) {
      finalOpts.logo = opts.customLogo;
    }

    if(opts.useLogo === false) {
      finalOpts.logo = '';
    }

    this.qrcode = new QRCode(finalOpts);
    return await this.qrcode.toDataURL();
  }

}

var paynowqr_node = PaynowQR;

export default paynowqr_node;
