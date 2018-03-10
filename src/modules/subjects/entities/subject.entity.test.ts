import { SubjectEntity } from './subject.entity';

describe('Subject', () => {
    describe('copy constructor', () => {
        it('uses a default value for (copy) undefined properties', () => {
            const subject = new SubjectEntity();

            expect(subject.subject_id).toBe(undefined);
            expect(subject.name).toBe('');
            expect(subject.linked_events).toEqual([]);
        });

        it('sets the given country_id, if any', () => {
            const subject_id = 'daf97727-769a-45bb-885e-d6cc1107f835';
            const subject = new SubjectEntity({ subject_id });

            expect(subject.subject_id).toBe(subject_id);
        });
    });
});
