import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {environment as ENV} from '@env/environment';
import {NgForm} from '@angular/forms';
import {takeWhile} from 'rxjs/operators';
import {DateSheetService, ModelPaperService, ResultService} from '@app/services';
import * as Enums from '@app/app.enums';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {

  alive = true;
  commentName = '';
  commentText = '';
  commentEmail = '';
  addingComment = false;
  commentNameErrorMsg = '';
  commentTextErrorMsg = '';
  commentEmailErrorMsg = '';
  isValidCommentName = false;
  isValidCommentText = false;
  isValidCommentEmail = false;

  @Input() comments = [];
  @Input() source: string;
  @Input() sourceId: string;

  constructor(private resultService: ResultService,
              private dateSheetService: DateSheetService,
              private modelPaperService: ModelPaperService) { }

  ngOnInit() {
  }

  isAlive = () => {

    return this.alive;

  }

  validateCommentName(event) {

    if (event) {

      this.commentName = event.target.value;

      if (!this.commentName || this.commentName === '' || this.commentName.length < 2 || this.commentName.length > 40) {

        this.isValidCommentName = false;

        this.commentNameErrorMsg = 'Name must be (2-40) characters long';

        return;

      }

      this.commentNameErrorMsg = '';

      this.isValidCommentName = true;

    }

  }

  validateCommentEmail(event) {

    if (event) {

      this.commentEmail = event.target.value;

      if (!this.commentEmail || this.commentEmail === '' || this.commentEmail.length > 100 || !this.commentEmail.match(ENV.EMAIL_REGEX)) {

        this.isValidCommentEmail = false;

        this.commentEmailErrorMsg = 'Invalid email address provided';

        return;

      }

      this.commentEmailErrorMsg = '';

      this.isValidCommentEmail = true;

    }

  }

  validateCommentText(event) {

    if (event) {

      this.commentText = event.target.value;

      if (!this.commentText || this.commentText === '' || this.commentText.length < 2 || this.commentText.length > 500) {

        this.isValidCommentText = false;

        this.commentTextErrorMsg = 'Content must be (2-500) characters long';

        return;

      }

      this.commentTextErrorMsg = '';

      this.isValidCommentText = true;

    }

  }

  addComment (form: NgForm) {

    if (!form || form.invalid) {

      return;

    }

    if (this.isValidCommentName && this.isValidCommentText && this.isValidCommentEmail) {

      const comment = {
        name: this.commentName,
        text: this.commentText,
        email: this.commentEmail
      };

      this.addingComment = true;

      let addCommentHttp;

      if (this.source === Enums.COMMENT_SOURCE.RESULT) {

        addCommentHttp = this.resultService.addComment(this.sourceId, comment);

      } else if (this.source === Enums.COMMENT_SOURCE.DATE_SHEET) {

        addCommentHttp = this.dateSheetService.addComment(this.sourceId, comment);

      } else if (this.source === Enums.COMMENT_SOURCE.MODEL_PAPER) {

        addCommentHttp = this.modelPaperService.addComment(this.sourceId, comment);

      }

      addCommentHttp.pipe(takeWhile(this.isAlive)).subscribe(
          response => {

            if (response && response.data) {

              this.comments.reverse();

              this.comments.push(response.data);

              this.comments.reverse();

              form.resetForm();

            }

            this.addingComment = false;

          },
          error => {

            this.addingComment = false;

          });

    }

  }

  ngOnDestroy() {

    this.alive = false;

  }

}
